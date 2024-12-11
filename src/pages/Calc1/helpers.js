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
        unitShort: item.unitShort || item.defaultUnit || "Штук",
        usageCoefficient: section.section.includes("инженерного") ? 0.6 : 0.3, // Уточнение логики коэффициента
        formula: item.formula,
        description: item.description,
        fixedUnit: !!item.unit,
        consumedPower: (
          item.defaultValue *
          1 *
          (section.section.includes("инженерного") ? 0.6 : 0.3)
        ).toFixed(2), // Вычисление требуемой мощности
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
