
const API_KEY = 'AIzaSyDpgctHbouk6XRu7cEEVe0YTugDab72Zrs';
const VIDEO_API = "https://www.googleapis.com/youtube/v3/videos";
const channel_http ="https://www.googleapis.com/youtube/v3/channels?";
const container = document.querySelector(".video-wrapper");

async function fetchPopularVideos() {
  try {
    const res = await fetch(
      `${VIDEO_API}?` +
        new URLSearchParams({
          part: "snippet,statistics",
          chart: "mostPopular",
          maxResults: 20,
          regionCode: "IN",
          key: API_KEY,
        })
    );

    const data = await res.json();

    data.items.forEach((item) => {
      const { title, thumbnails, channelTitle, publishedAt } = item.snippet;
      const videoId = item.id;
      const views = item.statistics.viewCount;

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${thumbnails.medium.url}" alt="${title}" class="thumbnail" />
        <div class="bottom">
          <img src="https://via.placeholder.com/40.png?text=${channelTitle.charAt(0)}" class="channel-icon" alt="${channelTitle}" />
          <div class="info">
            <h4 class="title">${title}</h4>
            <p class="channel-name">${channelTitle}</p>
            <p class="views">${formatViews(views)} • ${new Date(publishedAt).toDateString()}</p>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        const video = {
          title,
          channelName: channelTitle,
          thumbnail: thumbnails.medium.url,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          time: new Date(publishedAt).toDateString(),
          profile: `https://via.placeholder.com/40.png?text=${channelTitle.charAt(0)}`,
          views: formatViews(views)
        };

        localStorage.setItem("selectedVideo", JSON.stringify(video));
        window.location.href = "video-page.html";
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to fetch videos:", error);
  }
}

function formatViews(num) {
  const n = Number(num);
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B views";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M views";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K views";
  return n + " views";
}

fetchPopularVideos();

