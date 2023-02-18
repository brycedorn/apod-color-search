use colorsys::Rgb;
use image::{DynamicImage, GenericImageView, Rgba};
use std::collections::{BTreeMap, HashMap, HashSet};
use std::sync::{Arc, Mutex};
use std::{i64, thread};

// Generate hex string from pixel.
pub fn generate_hex(pixel: Rgba<u8>) -> String {
    Rgb::from((pixel[0] as f32, pixel[1] as f32, pixel[2] as f32)).to_hex_string()
}

pub fn to_hex_vec(input: Vec<Rgba<u8>>) -> Vec<String> {
    Vec::from_iter(input)
        .into_iter()
        .map(generate_hex)
        .collect::<Vec<String>>()
}

// Generate pixel from hex string.
pub fn generate_pixel(h: String) -> Rgba<u8> {
    let rgb = Rgb::from_hex_str(&h).unwrap();

    Rgba([rgb.red() as u8, rgb.green() as u8, rgb.blue() as u8, 255])
}

pub fn to_pixel_vec(input: BTreeMap<String, usize>) -> Vec<(Rgba<u8>, usize)> {
    Vec::from_iter(input)
        .into_iter()
        .map(|(h, f)| (generate_pixel(h), f))
        .collect::<Vec<(Rgba<u8>, usize)>>()
}

// Get difference between two pixels for specific channel.
pub fn get_difference(a: &Rgba<u8>, b: &Rgba<u8>, color: usize) -> i64 {
    let color1 = a.0[color] as i64;
    let color2 = b.0[color] as i64;

    i64::abs(color1 - color2)
}

pub fn get_luminance(pixel: Rgba<u8>) -> f32 {
    let rgb = pixel.0;

    0.2126 * rgb[0] as f32 + 0.7152 * rgb[1] as f32 + 0.0722 * rgb[2] as f32
}

// Determines if two pixels are within a similarity threshold.
pub fn within_threshold(a: &Rgba<u8>, b: &Rgba<u8>, color: usize, threshold: i64) -> bool {
    let color1 = a.0[color] as i64;
    let color2 = b.0[color] as i64;

    let mut min = 0;
    let mut max = 255;

    if color2 >= threshold {
        min = color2 - threshold;
    }

    if color2 <= (255 - threshold) {
        max = color2 + threshold
    }

    color1 >= min && color1 <= max
}

// Converts pixels to vector of colored hex values.
pub fn get_colors_from(img: &DynamicImage) -> Vec<Rgba<u8>> {
    let gray_pixels: HashSet<Rgba<u8>> =
        img.grayscale().pixels().into_iter().map(|p| p.2).collect();

    let all_pixels: Vec<Rgba<u8>> = img.pixels().into_iter().map(|p| p.2).collect();

    let all_pixels_len = all_pixels.len();

    let colored_pixels: Vec<Rgba<u8>> = all_pixels
        .into_iter()
        .filter(|p| !gray_pixels.contains(p))
        .collect();

    let colored_percent = (colored_pixels.len() as f32) / (all_pixels_len as f32) * 100.0;

    if colored_pixels.is_empty() {
        println!("no colored pixels found.");

        return colored_pixels;
    }

    println!("filtered out {:.2}% grayscale pixels", colored_percent);

    let luminous_pixels: Vec<Rgba<u8>> = colored_pixels
        .into_iter()
        .filter(|p| get_luminance(*p) > 50.)
        .collect();

    let luminous_percent = (luminous_pixels.len() as f32) / (all_pixels_len as f32) * 100.0;

    println!("filtered out {:.2}% non-luminous pixels", luminous_percent);

    luminous_pixels
}

// Get frequency for each color in image.
pub fn get_frequency(input: Vec<String>, worker_count: usize) -> BTreeMap<String, usize> {
    let result = Arc::new(Mutex::new(BTreeMap::<String, usize>::new()));

    input
        .chunks((input.len() as f64 / worker_count as f64).ceil() as usize)
        .enumerate()
        .map(|(_, chunk)| {
            let chunk = chunk.iter().map(String::from).collect::<Vec<String>>();

            let rresult = result.clone();

            thread::spawn(move || {
                chunk.iter().for_each(|h| {
                    rresult
                        .lock()
                        .unwrap()
                        .entry(h.to_string())
                        .and_modify(|e| *e += 1)
                        .or_insert(1);
                })
            })
        })
        .for_each(|handle| handle.join().unwrap());

    Arc::try_unwrap(result).unwrap().into_inner().unwrap()
}

// Combine similar colors.
pub fn assign_clusters(input: Vec<(Rgba<u8>, usize)>, threshold: i64) -> HashMap<Rgba<u8>, usize> {
    let mut result = HashMap::<Rgba<u8>, usize>::new();

    for item in input {
        let rresult = result.clone();

        // First filter for any similar R values
        let s_r: Vec<Rgba<u8>> = rresult
            .into_keys()
            .filter(|p| within_threshold(p, &item.0, 0, threshold))
            .collect();

        if !s_r.is_empty() {
            // Then filter for any similar RG values
            let s_g: Vec<&Rgba<u8>> = s_r
                .iter()
                .filter(|p| within_threshold(p, &item.0, 1, threshold))
                .collect();

            if !s_g.is_empty() {
                // Then filter for any similar RGB values
                let s_b: Vec<&&Rgba<u8>> = s_g
                    .iter()
                    .filter(|p| within_threshold(p, &item.0, 2, threshold))
                    .collect();

                if !s_b.is_empty() {
                    // Find closest one
                    let distances: Vec<i64> =
                        s_b.iter().map(|p| get_difference(p, &item.0, 2)).collect();

                    let index_of_closest: Option<usize> = distances
                        .iter()
                        .enumerate()
                        .min_by(|(_, a), (_, b)| a.partial_cmp(b).unwrap())
                        .map(|(index, _)| index);

                    let similar_item = s_b[index_of_closest.unwrap()];

                    result.entry(**similar_item).and_modify(|e| *e += item.1);
                } else {
                    result.insert(item.0, item.1);
                }
            } else {
                result.insert(item.0, item.1);
            }
        } else {
            result.insert(item.0, item.1);
        }
    }

    result
}

// Reduce and sort hash of results.
pub fn get_top_clusters(
    input: HashMap<Rgba<u8>, usize>,
    dimensions: (u32, u32),
    num_clusters: usize,
) -> Vec<(String, (usize, f32))> {
    let mut result = BTreeMap::<String, (usize, f32)>::new();

    let min_freq = 10;

    let total_pixels = dimensions.0 as f32 * dimensions.1 as f32;

    for (p, f) in input {
        if f > min_freq {
            result.insert(generate_hex(p), (f, (f as f32 * 100. / total_pixels)));
        }
    }

    let mut sorted_result = Vec::from_iter(result);

    sorted_result.sort_by(|(_, f_a), (_, f_b)| f_b.partial_cmp(f_a).unwrap());

    let size = std::cmp::min(num_clusters, sorted_result.len());

    sorted_result[0..size].to_vec()
}

pub fn get_clusters_from_image(img: &image::DynamicImage) -> Vec<(String, (usize, f32))> {
    println!(
        "image loaded, dimensions: {}x{}",
        img.dimensions().0,
        img.dimensions().1
    );

    let colors = get_colors_from(img);
    let colors_len = colors.len();
    println!("found {colors_len} pixels...");

    if colors_len == 0 {
        return Vec::from([]);
    }

    let colors_vec: Vec<String> = to_hex_vec(colors);
    let hex_freq = get_frequency(colors_vec, 5);
    let hex_freq_len = hex_freq.len().to_string();
    println!("got frequency for {hex_freq_len} pixels...");

    let pixel_vec: Vec<(Rgba<u8>, usize)> = to_pixel_vec(hex_freq);
    let clusters = assign_clusters(pixel_vec, 20);
    let clust_len: String = clusters.len().to_string();
    println!("{clust_len} clusters generated");

    let top_clusters: Vec<(String, (usize, f32))> =
        get_top_clusters(clusters, img.dimensions(), 20);
    println!("top 10 clusters:");

    for (h, (f, p)) in top_clusters.clone() {
        println!("{h}: {f} ({p}%)");
    }

    top_clusters
}
