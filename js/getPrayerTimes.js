const country = document.getElementById("country");
const city = document.getElementById("city");
const info = document.querySelector(".info");
const pTimes = document.getElementById("prayerTimes");

const citiesData = {
  سوريا: [
    "الشام",
    "ريف دمشق",
    "حلب",
    "حمص",
    "حماة",
    "اللاذقية",
    "طرطوس",
    "إدلب",
    "الرقة",
    "دير الزور",
    "الحسكة",
    "القامشلي",
    "درعا",
    "السويداء",
    "القنيطرة",
  ],

  السعودية: [
    "الرياض",
    "مكة المكرمة",
    "المدينة المنورة",
    "القصيم",
    "الشرقية",
    "عسير",
    "تبوك",
    "حائل",
    "الحدود الشمالية",
    "جازان",
    "نجران",
    "الباحة",
    "الجوف",
  ],

  مصر: [
    "القاهرة",
    "الإسكندرية",
    "الجيزة",
    "القليوبية",
    "الشرقية",
    "الدقهلية",
    "البحيرة",
    "المنوفية",
    "الغربية",
    "كفر الشيخ",
    "دمياط",
    "بورسعيد",
    "الإسماعيلية",
    "السويس",
    "شمال سيناء",
    "جنوب سيناء",
    "مرسى مطروح",
    "الفيوم",
    "بني سويف",
    "المنيا",
    "أسيوط",
    "سوهاج",
    "قنا",
    "الأقصر",
    "أسوان",
    "البحر الأحمر",
    "الوادي الجديد",
  ],

  الجزائر: [
    "الجزائر",
    "وهران",
    "قسنطينة",
    "عنابة",
    "البليدة",
    "باتنة",
    "سطيف",
    "تلمسان",
    "بجاية",
    "سكيكدة",
    "تيارت",
    "بسكرة",
    "الشلف",
    "المدية",
    "ورقلة",
    "غرداية",
    "بشار",
    "تبسة",
    "الجلفة",
    "سوق أهراس",
    "مستغانم",
    "المسيلة",
    "عين الدفلى",
    "النعامة",
    "البيض",
    "تيزي وزو",
    "جيجل",
    "ميلة",
    "قالمة",
    "سيدي بلعباس",
    "معسكر",
    "برج بوعريريج",
    "خنشلة",
    "أم البواقي",
    "الوادي",
    "تقرت",
    "إليزي",
    "تمنراست",
    "أدرار",
  ],

  المغرب: [
    "الدار البيضاء",
    "الرباط",
    "فاس",
    "مراكش",
    "طنجة",
    "مكناس",
    "أكادير",
    "وجدة",
    "القنيطرة",
    "تطوان",
    "سلا",
    "تمارة",
    "الجديدة",
    "آسفي",
    "خريبكة",
    "بني ملال",
    "الناظور",
    "تازة",
    "العرائش",
    "الحسيمة",
    "شفشاون",
    "وزان",
    "السمارة",
    "العيون",
    "الداخلة",
    "بوجدور",
    "طاطا",
    "زاكورة",
    "الرشيدية",
    "ورزازات",
    "تنغير",
    "الصويرة",
    "سيدي بنور",
    "اليوسفية",
    "الفقيه بنصالح",
    "برشيد",
    "القصر الكبير",
    "تاوريرت",
    "جرادة",
    "بركان",
    "سيدي سليمان",
    "الخميسات",
    "خنيفرة",
    "تيفلت",
    "سيدي قاسم",
    "قلعة السراغنة",
    "أولاد تايمة",
    "بنجرير",
  ],

  الأردن: [
    "عمان",
    "الزرقاء",
    "إربد",
    "البلقاء",
    "مادبا",
    "الكرك",
    "معان",
    "الطفيلة",
    "عجلون",
    "جرش",
    "المفرق",
    "العقبة",
  ],
};

const methodForCountry = {
  سوريا: 3,
  السعودية: 4,
  مصر: 5,
  الجزائر: 19,
  المغرب: 21,
  الأردن: 23,
};

country.addEventListener("change", () => {
  populateCities(country.value);
  const selectedMethod = methodForCountry[country.value] || 3;
  getPrayerTimes(country.value, city.options[0].value, selectedMethod);
});

city.addEventListener("change", () => {
  const selectedMethod = methodForCountry[country.value] || 3;
  getPrayerTimes(country.value, city.value, selectedMethod);
});

function populateCities(countryName) {
  const cities = citiesData[countryName] || [];
  city.innerHTML = "";

  cities.forEach((cityName) => {
    const option = document.createElement("option");
    option.value = cityName;
    option.textContent = cityName;
    city.appendChild(option);
  });
}

// GET Prayer Times
function getPrayerTimes(country = "سوريا", city = "الشام", meth = 3) {
  const today = new Date();
  const localDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const enCodeCountry = encodeURIComponent(country);
  const enCodeCity = encodeURIComponent(city);
  axios(
    `https://api.aladhan.com/v1/timingsByCity/${localDate}?city=${enCodeCity}&country=${enCodeCountry}&method=${meth}`,
  )
    .then((response) => {
      const resData = response.data;
      const allData = resData.data;
      const gregorian = allData.date.gregorian.date;
      const hijri = allData.date.hijri;
      info.innerHTML = `
      <p>الدولة : ${country} / ${city}</p>
      <div dir="rtl" class="date">
        <p>التاريخ الميلادي : ${gregorian.replaceAll("-", "/")}</p>
        <p>التاريخ الهجري : ${hijri.weekday.ar} / ${hijri.day} / ${hijri.month.ar} / ${hijri.year}هـ</p>
      </div>
    `;
      const timings = allData.timings;
      pTimes.innerHTML = `
      <div class="time">
        <h3>الفجر</h3>
        <span> <span>${timings.Fajr}</span> صباحاً</span>
      </div>
      <div class="time">
        <h3>الشروق</h3>
        <span><span>${timings.Sunrise}</span> صباحاً</span>
      </div>
      <div class="time">
        <h3>الظهر</h3>
        <span><span>${timings.Dhuhr}</span> ظهراً</span>
      </div>
      <div class="time">
        <h3>العصر</h3>
        <span><span>${timings.Asr}</span> مساءً</span>
      </div>
        <div class="time">
          <h3>المغرب</h3>
          <span><span>${timings.Maghrib}</span> مساءً</span>
        </div>
      <div class="time">
        <h3>العشاء</h3>
        <span><span>${timings.Isha}</span> مساءً</span>
      </div>
    `;
    })
    .catch((error) => {
      console.log("خطأ كامل", error);
      console.log("استجابة الخطأ", error.response);
      info.innerHTML = `<p style="color:red; text-align:center; font-weight:bold;">خطأ في جلب بيانات ${city}</p>`;
    });
}

populateCities("سوريا");
getPrayerTimes();
