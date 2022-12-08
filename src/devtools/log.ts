export default function (message: string, color = "#69DCA4") {
  console.log(
    `%cVue Material You%c ${message}`,
    "color: #D0E8D7; background-color: #364B3F; border-radius:4px; padding:2px 10px;",
    `color:${color}`
  );
}
