// Boot sequence
window.onload = function() {
    setTimeout(() => {
        document.getElementById('bootScreen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
    }, 3000); // 3 seconds boot
};

// Existing time function (kept for reference, but not used in OS)
function showTime() {
    // Removed as not needed for OS
}
