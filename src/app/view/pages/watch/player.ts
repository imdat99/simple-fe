export default function player(options: Record<string, any>) {
  const { subtitle, ...artOptions } = options;
  const artInstant = new (window as any).Artplayer({
    container: ".player-container",
    isLive: false,
    muted: false,
    autoplay: false,
    pip: true,
    autoSize: true,
    autoMini: true,
    screenshot: true,
    setting: true,
    loop: true,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    fullscreen: true,
    fullscreenWeb: true,
    subtitleOffset: true,
    miniProgressBar: true,
    mutex: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    airplay: true,
    theme: "#E03131",
    customType: {
      m3u8(video: any, url: string) {
        const Hls = (window as any).Hls;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = url;
        } else {
          (this as any).notice.show = "Does not support playback of m3u8";
        }
      },
    },
    controls: [
      {
        position: "right",
        html: "Control",
        index: 1,
        tooltip: "Control Tooltip",
        style: {
          marginRight: "20px",
        },
        click: function () {
          console.info("You clicked on the custom control");
        },
      },
    ],
    subtitle: {
      url:
        (
          subtitle.find((item: any) => item?.languageAbbr === "vi") ||
          subtitle[0]
        )?.subtitlingUrl || "",
      type: "srt",
      style: {
        color: "#fff",
        fontSize: "2.5rem",
      },
      encoding: "utf-8",
    },
    settings: [
      {
        width: 200,
        html: "Subtitle",
        tooltip: "Bilingual",
        icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/subtitle.svg">',
        selector: [
          {
            html: "Display",
            tooltip: "Show",
            switch: true,
            onSwitch: function (item: any) {
              item.tooltip = item.switch ? "Hide" : "Show";
              artInstant.subtitle.show = !item.switch;
              return !item.switch;
            },
          },
          ...subtitle.map((item: any) => ({
            default: item?.languageAbbr === "vi",
            html: item?.language,
            url: item?.subtitlingUrl,
          })),
        ],
        onSelect: function (item: any) {
          artInstant.subtitle.switch(item.url, {
            name: item.html,
          });
          return item.html;
        },
      },
    ],
    ...artOptions,
  });

  return artInstant;
}
