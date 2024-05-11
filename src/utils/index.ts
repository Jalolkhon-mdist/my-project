const categories = [
  {
    label: "Mental Health",
    color: "blue",
    value: [
      { value: "addiction-recovery", label: "Addiction Recovery" },
      { value: "anxiety", label: "Anxiety" },
      { value: "bipolar-disorder", label: "Bipolar Disorder" },
      { value: "depression", label: "Depression" },
      { value: "eating-disorders", label: "Eating Disorders" },
      { value: "grief-and-loss", label: "Grief & Loss" },
      {
        value: "obsessive-compulsive-disorder",
        label: "Obsessive-Compulsive Disorder",
      },
      { value: "personality-disorders", label: "Personality Disorders" },
      { value: "ptsd", label: "PTSD" },
      { value: "schizophrenia", label: "Schizophrenia" },
      { value: "self-harm", label: "Self-Harm" },
      { value: "stress", label: "Stress" },
      { value: "suicide-prevention", label: "Suicide Prevention" },
      { value: "trauma", label: "Trauma" },
    ],
  },
  {
    label: "Physical Health",
    color: "green",
    value: [
      { value: "chronic-pain", label: "Chronic Pain" },
      { value: "cancer", label: "Cancer" },
      { value: "diabetes", label: "Diabetes" },
      { value: "heart-disease", label: "Heart Disease" },
      { value: "obesity", label: "Obesity" },
      { value: "arthritis", label: "Arthritis" },
      { value: "asthma", label: "Asthma" },
      { value: "allergies", label: "Allergies" },
      { value: "hypertension", label: "Hypertension" },
      { value: "stroke", label: "Stroke" },
      { value: "mental-health-conditions", label: "Mental Health Conditions" },
      { value: "pregnancy", label: "Pregnancy" },
      { value: "childhood-illnesses", label: "Childhood Illnesses" },
      { value: "senior-health", label: "Senior Health" },
      { value: "reproductive-health", label: "Reproductive Health" },
    ],
  },
  {
    label: "Addiction & Recovery",
    color: "red",
    value: [
      { value: "alcoholism", label: "Alcoholism" },
      { value: "drug-addiction", label: "Drug Addiction" },
      { value: "gambling-addiction", label: "Gambling Addiction" },
      { value: "smoking-cessation", label: "Smoking Cessation" },
      { value: "substance-abuse", label: "Substance Abuse" },
      { value: "sober-living", label: "Sober Living" },
    ],
  },
  {
    label: "Relationships",
    color: "orange",
    value: [
      { value: "marriage", label: "Marriage" },
      { value: "dating", label: "Dating" },
      { value: "divorce", label: "Divorce" },
      { value: "parenting", label: "Parenting" },
      { value: "family-issues", label: "Family Issues" },
      { value: "friendship", label: "Friendship" },
      { value: "loneliness", label: "Loneliness" },
      { value: "domestic-violence", label: "Domestic Violence" },
      { value: "relationship-breakups", label: "Relationship Breakups" },
      { value: "infidelity", label: "Infidelity" },
      { value: "codependency", label: "Codependency" },
      { value: "intimacy", label: "Intimacy" },
      { value: "communication", label: "Communication" },
      { value: "trust-issues", label: "Trust Issues" },
      { value: "jealousy", label: "Jealousy" },
    ],
  },
];

const categoriesList: any = [];

categories.forEach((e) => {
  const returnVal: any = [];
  e.value.forEach((k) => {
    returnVal.push({ group: e.label, category: k.label, color: e.color });
  });

  categoriesList.push(returnVal);
});

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
        return `${timeDifference}s`;
      },
      minutes() {
        const minutes: number = Math.floor(timeDifference / minute);
        return `${minutes}min`;
      },
      hours() {
        const hours: number = Math.floor(timeDifference / hour);
        return `${hours}h`;
      },
      days() {
        const days: number = Math.floor(timeDifference / day);
        return `${days}d`;
      },
      weeks() {
        const weeks: number = Math.floor(timeDifference / week);
        return `${weeks}w`;
      },
      months() {
        const months: number = Math.floor(timeDifference / month);
        return `${months}mo`;
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
  categories,
  categoriesList,
};

export default utils;
