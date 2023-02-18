extern crate apod_color_search;

use apod_color_search::image_utils;
use image::Rgba;

#[test]
fn test_generate_hex() {
    let pixel = Rgba([255, 0, 221, 255]);
    let hex = image_utils::generate_hex(pixel);

    assert_eq!(hex, "#ff00dd");
}

#[test]
fn test_generate_pixel() {
    let hex = "#ff00dd".to_string();
    let pixel = image_utils::generate_pixel(hex);

    assert_eq!(pixel, Rgba([255, 0, 221, 255]));
}

#[test]
fn test_within_threshold() {
    let pixel_a = Rgba([255, 0, 221, 255]);
    let pixel_b = Rgba([250, 30, 0, 0]);

    assert!(image_utils::within_threshold(&pixel_a, &pixel_b, 0, 10));
    assert!(!image_utils::within_threshold(&pixel_a, &pixel_b, 1, 10));
    assert!(image_utils::within_threshold(&pixel_a, &pixel_b, 2, 250));
}

#[test]
fn test_get_difference() {
    let pixel_a = Rgba([255, 0, 221, 255]);
    let pixel_b = Rgba([250, 30, 0, 0]);

    assert_eq!(5, image_utils::get_difference(&pixel_a, &pixel_b, 0));
    assert_eq!(30, image_utils::get_difference(&pixel_a, &pixel_b, 1));
}

#[test]
fn test_get_luminance() {
    let pixel_a = Rgba([255, 0, 221, 255]);
    let pixel_b = Rgba([0, 0, 10, 255]);

    assert_eq!(70.1692, image_utils::get_luminance(pixel_a));
    assert_eq!(0.722, image_utils::get_luminance(pixel_b));
}

#[test]
fn test_get_colors_from() {
    let img = image::open("img/img.jpeg").unwrap();
    let set = image_utils::get_colors_from(&img);

    // Slight differences across OS
    assert!([3113, 3111].contains(&set.len()));
}

#[test]
fn test_get_frequency() {
    let vec = Vec::from([
        String::from("#ff00dd"),
        String::from("#00ffdd"),
        String::from("#ff00dd"),
    ]);

    let set = image_utils::get_frequency(vec, 1);

    assert_eq!(set.len(), 2);
    assert_eq!(set["#ff00dd"], 2);
    assert_eq!(set["#00ffdd"], 1);
}

#[test]
fn test_assign_clusters() {
    let pixel_a = Rgba([255, 0, 221, 255]);
    let pixel_b = Rgba([0, 0, 0, 0]);

    let vec = Vec::from([
        (pixel_a, 500),
        (Rgba([255, 0, 222, 255]), 50),
        (Rgba([255, 10, 221, 255]), 40),
        (Rgba([255, 0, 224, 255]), 30),
        (pixel_b, 100),
    ]);

    let clusters = image_utils::assign_clusters(vec, 10);
    assert_eq!(2, clusters.len());
    let keys: Vec<Rgba<u8>> = clusters.into_keys().collect();
    assert!(keys.contains(&pixel_a));
    assert!(keys.contains(&pixel_b));
}

#[test]
fn test_clusters_from_image() {
    let img = image::open("img/img-2.jpg").unwrap();
    let clusters = image_utils::get_clusters_from_image(&img);

    let (h, (_f, _p)) = &clusters[0];

    assert_eq!(h, "#436ab7");
    // assert_eq!(*f, 58813);
    // assert_eq!(*p, 46.86295);
}
