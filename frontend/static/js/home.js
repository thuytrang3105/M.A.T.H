document.addEventListener('DOMContentLoaded', () => {
    const zones = document.querySelectorAll('.zone');

    zones.forEach(zone => {
        zone.addEventListener('click', () => {
            const gameType = zone.getAttribute('data-type');
            startConnection(gameType);
        });
    });
});

function startConnection(type) {
    console.log(`Đang khởi động module: ${type}`);
    
    // Hiệu ứng giả lập trước khi chuyển trang
    const header = document.querySelector('header');
    header.innerText = "CONNECTING...";
    
    setTimeout(() => {
        alert(`Hệ thống: Đã kết nối tới phân khu ${type.toUpperCase()}. Chuẩn bị xuất kích!`);
        // Sau này dùng: window.location.href = `/game/${type}`;
    }, 500);
}