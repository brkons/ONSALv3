<?php
// CORS başlıkları
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Pre-flight isteği sonlandır
}

// Yükleme türünü kontrol et
$uploadType = isset($_POST['type']) ? $_POST['type'] : 'products';
$allowedTypes = ['products', 'banners', 'categories'];

if (!in_array($uploadType, $allowedTypes)) {
    echo json_encode(['success' => false, 'message' => 'Geçersiz yükleme türü!']);
    exit;
}

// Yükleme dizinini belirle
$uploadDir = 'uploads/' . $uploadType . '/';

// Dizin yoksa oluştur
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Dosya kontrolü
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'Dosya yükleme hatası!']);
    exit;
}

// Güvenli dosya adı oluştur
$fileName = $_FILES['file']['name'];
$fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
$safeFileName = uniqid() . '_' . time() . '.' . $fileExt;
$uploadPath = $uploadDir . $safeFileName;

// İzin verilen dosya türleri
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
if (!in_array(strtolower($fileExt), $allowedExtensions)) {
    echo json_encode(['success' => false, 'message' => 'Sadece resim dosyaları yüklenebilir!']);
    exit;
}

// Dosyayı taşı
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadPath)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Dosya başarıyla yüklendi',
        'fileName' => $safeFileName,
        'filePath' => $uploadPath,
        'fileUrl' => '/' . $uploadPath
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Dosya yüklenirken bir hata oluştu!']);
}
?>
