export function translateDayOfWeek(dayOfWeek) {
    const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const vietnameseDays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    const index = englishDays.indexOf(dayOfWeek);

    if (index !== -1) {
        return vietnameseDays[index];
    } else {
        return 'Không xác định';
    }
}