use crate::image_utils;

use postgrest::Postgrest;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::error::Error;
use std::string::String;

#[derive(Debug, Deserialize, Serialize)]
pub struct Day {
    id: Option<u32>,
    copyright: Option<String>,
    date: String,
    explanation: Option<String>,
    hdurl: Option<String>,
    media_type: String,
    service_version: Option<String>,
    title: String,
    url: Option<String>,
    exclude_from_results: Option<bool>,
}

impl Day {
    pub fn is_picture(&self) -> bool {
        self.media_type == "image"
            && !self.image_url().contains(".mp4")
            && !self.image_url().contains(".mpg")
            && !self.image_url().contains(".mov")
            && !self.image_url().contains(".wmv")
            && !self.image_url().contains("big.gif")
    }

    pub fn date(&self) -> String {
        self.date.to_string()
    }

    pub fn image_url(&self) -> String {
        match &self.hdurl {
            Some(s) => s.to_string(),
            None => "none".to_string(),
        }
    }

    pub fn url(&self) -> String {
        match &self.url {
            Some(s) => s.to_string(),
            None => "none".to_string(),
        }
    }

    pub fn db_id(&self) -> String {
        match &self.id {
            Some(s) => s.to_string(),
            None => "none".to_string(),
        }
    }

    pub fn exclude_from_results(&self) -> bool {
        match &self.exclude_from_results {
            Some(b) => *b,
            None => false,
        }
    }

    pub fn to_db_string(&self) -> String {
        let res = format!(
            r#"[{{ 
            "date": "{}",
            "hdurl": "{}",
            "media_type": "{}",
            "title": "{}",
            "url": "{}"
        }}]"#,
            self.date,
            self.image_url(),
            self.media_type,
            self.title.replace(['\n', '\r'], " ").replace('\"', "'"),
            self.url()
        );
        println!("{:?}", res);
        res
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Color {
    id: u32,
    hex: String,
    created_at: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Cluster {
    id: u32,
    freq: u32,
    color_id: u32,
    day_id: u32,
}

impl Cluster {
    pub fn db_id(&self) -> String {
        self.id.to_string()
    }
}

pub fn get_client() -> postgrest::Postgrest {
    let rest_url = std::env::var("SUPABASE_REST_URL").unwrap();

    Postgrest::new(rest_url)
        .insert_header("apikey", std::env::var("SUPABASE_PUBLIC_API_KEY").unwrap())
}

pub async fn insert_color(hex: String) -> Result<Color, Box<dyn Error>> {
    let client = get_client();

    let pixel = image_utils::generate_pixel(hex.to_string());

    let resp = client
        .from("colors")
        .insert(format!(
            r#"[{{ "hex": "{}", "r": "{}", "g": "{}", "b": "{}" }}]"#,
            hex, pixel[0], pixel[1], pixel[2]
        ))
        .execute()
        .await?;

    let body = resp.text().await?;
    let result: Vec<Color> = serde_json::from_str(&body).unwrap();

    match result.into_iter().next() {
        Some(c) => Ok(c),
        _ => Err("Error inserting color")?,
    }
}

pub async fn exclude_days(days: String) -> Result<(), Box<dyn Error>> {
    for day in days.split(',') {
        exclude_day(day.to_string()).await?;
    }

    Ok(())
}

pub async fn exclude_day(date: String) -> Result<Day, Box<dyn Error>> {
    let client = get_client();

    let test = r#"[{ "exclude_from_results": "true" }]"#.to_string();

    println!("update string: {}", test);

    let resp = client
        .from("days")
        .eq("date", date)
        .update(test)
        .execute()
        .await?;

    let body = resp.text().await?;
    let result: Vec<Day> = serde_json::from_str(&body).unwrap();

    match result.into_iter().next() {
        Some(d) => Ok(d),
        _ => Err("Error excluding day")?,
    }
}

pub async fn _update_color(hex: String, pixel: image::Rgba<u8>) -> Result<Color, Box<dyn Error>> {
    let client = get_client();

    let test = format!(
        r#"[{{ "r": "{}", "g": "{}", "b": "{}" }}]"#,
        pixel[0], pixel[1], pixel[2]
    );

    println!("update string: {}", test);

    let resp = client
        .from("colors")
        .eq("hex", hex)
        .update(test)
        .execute()
        .await?;

    let body = resp.text().await?;
    let result: Vec<Color> = serde_json::from_str(&body).unwrap();

    match result.into_iter().next() {
        Some(c) => Ok(c),
        _ => Err("Error updating color")?,
    }
}

pub async fn has_clusters(day: Day) -> Result<bool, Box<dyn Error>> {
    let clusters = get_clusters(day).await?;

    Ok(!clusters.is_empty())
}

pub async fn get_clusters(day: Day) -> Result<Vec<Cluster>, Box<dyn Error>> {
    let client = get_client();

    let resp = client
        .from("clusters")
        .eq("day_id", day.db_id())
        .execute()
        .await?;
    let body = resp.text().await?;
    let results: Vec<Cluster> = serde_json::from_str(&body).unwrap();

    Ok(results)
}

pub async fn insert_cluster(
    day_id: String,
    hex: String,
    freq: usize,
    percent: f32,
) -> Result<Cluster, Box<dyn Error>> {
    let client = get_client();

    let color = get_or_insert_color(hex).await?;
    let color_id = color.id;

    let resp = client
        .from("clusters")
        .insert(format!(
            r#"[{{ "day_id": {}, "color_id": {}, "freq": {}, "percent": {} }}]"#,
            day_id, color_id, freq, percent
        ))
        .execute()
        .await?;

    let body = resp.text().await?;
    let result: Vec<Cluster> = serde_json::from_str(&body).unwrap();

    match result.into_iter().next() {
        Some(c) => Ok(c),
        _ => Err("Error inserting cluster")?,
    }
}

pub async fn _update_cluster(
    cluster_id: String,
    p: f32,
    s: f32,
) -> Result<Cluster, Box<dyn Error>> {
    let client = get_client();

    let test = format!(r#"[{{ "percent": "{}", "significance": "{}" }}]"#, p, s);

    println!("update string: {}", test);

    let resp = client
        .from("clusters")
        .eq("id", cluster_id)
        .update(test)
        .execute()
        .await?;

    let body = resp.text().await?;

    println!("{}", body);

    let result: Vec<Cluster> = serde_json::from_str(&body).unwrap();

    match result.into_iter().next() {
        Some(c) => Ok(c),
        _ => Err("Error updating cluster")?,
    }
}

pub async fn insert_day(day: Day) -> Result<Day, Box<dyn Error>> {
    let client = get_client();

    let resp = client
        .from("days")
        .insert(day.to_db_string())
        .execute()
        .await?;

    let body: String = resp.text().await?;
    let result: Vec<Day> = serde_json::from_str(&body).unwrap();

    match result.into_iter().next() {
        Some(c) => Ok(c),
        _ => Err("Error inserting day")?,
    }
}

pub async fn get_or_insert_day(day: Day) -> Result<Day, Box<dyn Error>> {
    let client = get_client();

    let resp = client.from("days").eq("date", &day.date).execute().await?;
    let body = resp.text().await?;
    let result: Vec<Day> = serde_json::from_str(&body).unwrap();

    let res = match result.into_iter().next() {
        Some(d) => d,
        _ => insert_day(day).await?,
    };

    Ok(res)
}

pub async fn get_or_insert_color(hex: String) -> Result<Color, Box<dyn Error>> {
    let client = get_client();

    let resp = client.from("colors").eq("hex", &hex).execute().await?;
    let body = resp.text().await?;
    let result: Vec<Color> = serde_json::from_str(&body).unwrap();

    let res = match result.into_iter().next() {
        Some(c) => c,
        _ => insert_color(hex).await?,
    };

    Ok(res)
}

pub async fn _get_colors() -> Result<Vec<Color>, Box<dyn Error>> {
    let client = get_client();

    let resp = client.from("colors").execute().await?;
    let body = resp.text().await?;
    let results: Vec<Color> = serde_json::from_str(&body).unwrap();

    Ok(results)
}

pub async fn get_days(start_date: &str, end_date: &str) -> Result<Vec<Day>, Box<dyn Error>> {
    let api_url = std::env::var("APOD_API_URL").unwrap();
    let api_key = std::env::var("APOD_API_KEY").unwrap();
    let request_url = format!(
        "{}?api_key={}&start_date={}&end_date={}",
        api_url, api_key, start_date, end_date
    );

    println!("request_url: {}", request_url);

    let resp = reqwest::get(request_url).await?;
    let body = resp.text().await?;
    let days: Vec<Day> = serde_json::from_str(&body).unwrap();

    Ok(days)
}

pub async fn get_image(url: &str) -> Result<bytes::Bytes, Box<dyn Error>> {
    let img_bytes = reqwest::get(url).await?.bytes().await?;

    Ok(img_bytes)
}

pub async fn load_image(img_bytes: &[u8]) -> image::ImageResult<image::DynamicImage> {
    let img = image::load_from_memory(img_bytes)?;

    Ok(img)
}

pub async fn fetch_image(url: &str) -> Result<image::DynamicImage, Box<dyn Error>> {
    let img_bytes = get_image(url).await?;
    let img = load_image(&img_bytes).await?;

    Ok(img)
}

pub async fn kick_off_batch(year: String) -> Result<(), Box<dyn Error>> {
    for month in 0..12 {
        dispatch_workflow(year.to_string(), (month + 1).to_string()).await?;
    }

    Ok(())
}

pub async fn dispatch_workflow(year: String, month: String) -> Result<String, Box<dyn Error>> {
    let client = reqwest::Client::new();

    let body = json!({"ref":"main","inputs":{"year":year,"month":month}});

    let auth_token = format!("Bearer {}", std::env::var("GH_AUTH_TOKEN").unwrap());

    let res = client
        .post("https://api.github.com/repos/brycedorn/apod-color-search/actions/workflows/process.yml/dispatches")
        .header("Content-Type", "application/json")
        .header("User-Agent", "apod-color-search")
        .header("Accept", "application/vnd.github+json")
        .header("Authorization", auth_token)
        .json(&body)
        .send()
        .await?
        .text()
        .await?;

    Ok(res)
}
