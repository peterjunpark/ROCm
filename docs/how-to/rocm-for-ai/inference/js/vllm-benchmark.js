const urlParams = new URLSearchParams(globalThis.location.search);

function ready(proc) {
    if (document.readyState !== "loading") {
        proc();
        return;
    }
    document.addEventListener("DOMContentLoaded", proc);
}

// Entry point
ready(function () {
	alert("ready");
	console.log(urlParams)
});
