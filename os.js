// New file for OS logic
let windowCount = 0;
const apps = {
    app1: { name: 'Notepad', content: '<textarea style="width:100%; height:90%;">Type here...</textarea>' },
    app2: { name: 'Gallery', content: '<p>Image gallery placeholder</p>' },
    app3: { name: 'Music', content: '<iframe src="https://zacharyceiley-jpg.github.io/secret-Unblocked-Listen/" style="width:100%; height:100%; border:none;"></iframe>' }
};

// Open window
function openWindow(appId) {
    windowCount++;
    const app = apps[appId];
    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.id = `window-${windowCount}`;
    windowEl.style.left = `${100 + (windowCount * 50)}px`;
    windowEl.style.top = `${100 + (windowCount * 50)}px`;
    windowEl.innerHTML = `
        <div class="windowHeader">
            <span>${app.name}</span>
            <div class="windowButtons">
                <button class="windowBtn closeBtn" onclick="closeWindow('${windowEl.id}')"></button>
                <button class="windowBtn minimizeBtn" onclick="minimizeWindow('${windowEl.id}')"></button>
                <button class="windowBtn maximizeBtn" onclick="maximizeWindow('${windowEl.id}')"></button>
            </div>
        </div>
        <div class="windowContent">${app.content}</div>
    `;
    document.getElementById('mainArea').appendChild(windowEl);
    makeDraggable(windowEl);
}

// Close window
function closeWindow(id) {
    document.getElementById(id).remove();
}

// Minimize (hide)
function minimizeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Maximize
function maximizeWindow(id) {
    const win = document.getElementById(id);
    if (win.style.width === '100%') {
        win.style.width = '300px';
        win.style.height = '200px';
        win.style.left = '50%';
        win.style.top = '50%';
        win.style.transform = 'translate(-50%, -50%)';
    } else {
        win.style.width = '100%';
        win.style.height = '100%';
        win.style.left = '0';
        win.style.top = '0';
        win.style.transform = 'none';
    }
}

// Make draggable
function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.querySelector('.windowHeader').onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Search apps
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.appIcon').forEach(icon => {
        const appName = apps[icon.dataset.app].name.toLowerCase();
        icon.style.display = appName.includes(query) ? 'flex' : 'none';
    });
});

// Add click events to app icons
document.querySelectorAll('.appIcon').forEach(icon => {
    icon.addEventListener('click', () => openWindow(icon.dataset.app));
});
