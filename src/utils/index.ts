const utils = {
  count(count: number) {
    if (!count && count !== 0) return;
    const str = count.toString();
    if (str.length > 3) {
      return `${str.substring(0, 1)}.${str.substring(1, 2)}k`;
    } else {
      return str;
    }
  },
  timeAgo(ts: string) {
    const postedDate: Date = new Date(ts);
    const currentDate: Date = new Date();

    const timeDifference: number = Math.abs(
      Math.round((currentDate.getTime() - postedDate.getTime()) / 1000)
    );

    const minute: number = 60;
    const hour: number = 60 * minute;
    const day: number = 24 * hour;
    const week: number = 7 * day;
    const month: number = 30.44 * day;

    const returnString = {
      seconds() {
        return `${timeDifference} seconds ago`;
      },
      minutes() {
        const minutes: number = Math.floor(timeDifference / minute);
        const isOne = minutes === 1;
        return `${minutes} ${isOne ? "minute" : "minutes"} ago`;
      },
      hours() {
        const hours: number = Math.floor(timeDifference / hour);
        const isOne = hours === 1;
        return `${hours} ${isOne ? "hour" : "hours"} ago`;
      },
      days() {
        const days: number = Math.floor(timeDifference / day);
        const isOne = days === 1;
        return `${days} ${isOne ? "day" : "days"} ago`;
      },
      weeks() {
        const weeks: number = Math.floor(timeDifference / week);
        const isOne = weeks === 1;
        return `${weeks} ${isOne ? "week" : "weeks"} ago`;
      },
      months() {
        const months: number = Math.floor(timeDifference / month);
        const isOne = months === 1;
        return `${months} ${isOne ? "month" : "months"} ago`;
      },
    };

    if (timeDifference < minute) {
      return returnString.seconds();
    } else if (timeDifference < hour) {
      return returnString.minutes();
    } else if (timeDifference < day) {
      return returnString.hours();
    } else if (timeDifference < week) {
      return returnString.days();
    } else if (timeDifference < month) {
      return returnString.weeks();
    } else {
      return returnString.months();
    }
  },
  trim(ref: any) {
    if (ref.current && ref.current.textContent) {
      if (ref.current.textContent?.trim().length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },
  topics: [
    { icon: "joystick", name: "Gaming" },
    { icon: "monitoring", name: "Business" },
    { icon: "gamepad", name: "Game Reviews" },
    { icon: "joystick", name: "PC Gaming" },
    { icon: "sports_soccer", name: "Sport" },
    { icon: "keyboard", name: "Software Development" },
    { icon: "headset", name: "Accessories" },
    { icon: "comic_bubble", name: "Anime" },
    { icon: "smart_display", name: "Television" },
    { icon: "styler", name: "Fashion" },
    { icon: "movie_edit", name: "Movies" },
    { icon: "trophy", name: "Achievements and Trophies" },
  ],
  editorConfig: {
    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "link",
      "color",
      "image",
      "background",
      "align",
    ],
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: ["right", "center", "justify"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [
          {
            color: [],
          },
        ],
        [
          {
            background: [],
          },
        ],
      ],
    },
  },
};

export default utils;
