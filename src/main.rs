extern crate image;

mod api;
mod image_utils;

use chrono::{Datelike, Duration, TimeZone, Utc};
use howlong::ProcessCPUTimer;
use std::env;
use std::error::Error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let timer = ProcessCPUTimer::new();

    let args: Vec<String> = env::args().collect();

    // TODO: split out of main
    if args[1] == "batch" {
        api::kick_off_batch(args[2].to_string()).await?;

        return Ok(());
    } else if args[1] == "exclude" {
        api::exclude_days(args[2].to_string()).await?;

        return Ok(());
    }

    let first_apod = Utc.ymd(1995, 6, 16);
    let today = Utc::today();

    let numbers: Vec<u32> = args.iter().flat_map(|x| x.parse()).collect();
    let day = Utc.ymd(numbers[0] as i32, numbers[1], 1);

    if day < first_apod || day > today {
        Err(format!(
            "Out of range, date must be between {} and {}.",
            first_apod.format("%b %e, %Y"),
            today.format("%b %e, %Y")
        ))?;
    }

    let apods = fetch_month(day).await?;
    let apods_len = apods.len();

    let mut i = 1;

    for apod in apods {
        process_apod(apod).await?;

        println!("completed {i} of {apods_len} at {:?}", timer.elapsed().real);

        i += 1;
    }

    Ok(())
}

async fn fetch_month(first_day: chrono::Date<Utc>) -> Result<Vec<api::Day>, Box<dyn Error>> {
    let first_day_formatted = first_day.format("%Y-%m-%d").to_string();
    let today = Utc::today();

    let mut last_day = (first_day + Duration::days(31)).with_day(1).unwrap() - Duration::days(1);

    if last_day > today {
        last_day = today;
    }

    let last_day_formatted = last_day.format("%Y-%m-%d").to_string();

    println!(
        "retrieving data for range {} - {}",
        first_day_formatted, last_day_formatted
    );

    let apods = api::get_days(&first_day_formatted, &last_day_formatted).await?;

    let apods_len = apods.len();
    println!("retrieved data for {} apods.", apods_len);

    Ok(apods)
}

async fn process_apod(apod: api::Day) -> Result<(), Box<dyn Error>> {
    let image_url = apod.image_url().to_string();
    println!("loading {}", image_url);

    let day = api::get_or_insert_day(apod).await?;

    let is_picture = day.is_picture();
    let exclude_from_results = day.exclude_from_results();
    let day_id = day.db_id();

    println!("got day for {}, id: {}", day.date(), day_id);

    if is_picture {
        if !exclude_from_results {
            let has_clusters = api::has_clusters(day).await?;

            if !has_clusters {
                let img = api::fetch_image(&image_url).await?;
                let clusters = image_utils::get_clusters_from_image(&img);

                println!("saving {} clusters", clusters.len());

                for (h, (f, p)) in clusters {
                    let db_cluster = api::insert_cluster(day_id.to_string(), h, f, p).await?;

                    println!("saved cluster {}", db_cluster.db_id());
                }
            } else {
                println!("already generated clusters, skipping");
            }
        } else {
            println!("excluded from results, skipping");
        }
    } else {
        println!("isn't a picture, skipping");
    }

    Ok(())
}
