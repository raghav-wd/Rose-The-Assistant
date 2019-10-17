function soundChip(videoId, videoTitle) {
    chip(`Playing ${videoTitle}`, 0, 1)
    document.getElementById("youtube").innerHTML = `<div class="row">
    <div class="col s12 m7 l7"><div class="card small" style="height: 260px"><div><iframe width="100%" height="220"
    src="https://www.youtube.com/embed/${videoId}?autoplay=1">
    </iframe></div></div></div>`
}