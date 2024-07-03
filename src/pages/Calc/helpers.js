import jsonData from "./powerData.json";

// Подготавливаем данные для таблицы и сортируем элементы в каждом разделе по алфавиту
export const prepareDataSource = () => {
  return jsonData.reduce((acc, section, sectionIndex) => {
    const sectionItems = section.items
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item, itemIndex) => ({
        key: `${sectionIndex}-${itemIndex}`,
        name: item.name,
        value: item.defaultValue,
        count: 1,
        unit: item.unit || item.defaultUnit || "Штук",
        usageCoefficient:
          section.section === "Электроприборы инженерного назначения" ||
          section.section === "Электроприборы бытового назначения"
            ? 0.6
            : 0.3,
        formula: item.formula,
        description: item.description,
        fixedUnit:
          !!item.unit ||
          section.section === "Электроприборы инженерного назначения" ||
          section.section === "Электроприборы бытового назначения",
      }));
    return [
      ...acc,
      {
        key: `section-${sectionIndex}`,
        section: section.section,
        isSection: true,
      },
      ...sectionItems,
    ];
  }, []);
};

// import jsonData from "./powerData.json";

// // Подготавливаем данные для таблицы и сортируем элементы в каждом разделе по алфавиту
// export const prepareDataSource = () => {
//   return jsonData.reduce((acc, section, sectionIndex) => {
//     const sectionItems = section.items
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .map((item, itemIndex) => ({
//         key: `${sectionIndex}-${itemIndex}`,
//         name: item.name,
//         value: item.defaultValue,
//         count: 1,
//         unit: item.unit || item.defaultUnit || "Штук", // Добавляем unit из JSON или дефолтное значение
//         usageCoefficient:
//           section.section === "Электроприборы инженерного назначения"
//             ? 0.6
//             : 0.3,
//         formula: item.formula,
//         description: item.description,
//         fixedUnit: !!item.unit, // Устанавливаем флаг, если unit задан в JSON
//       }));
//     return [
//       ...acc,
//       {
//         key: `section-${sectionIndex}`,
//         section: section.section,
//         isSection: true,
//       },
//       ...sectionItems,
//     ];
//   }, []);
// };
