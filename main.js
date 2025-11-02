function normalizeDwarfholdKey(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

const dwarfholdStructureKeys = new Set(
  [
    'DWARFHOLD',
    'GREAT_DWARFHOLD',
    'GREATDWARFHOLD',
    'ABANDONED_DWARFHOLD',
    'DARK_DWARFHOLD',
    'DARKDWARFHOLD',
    'HILLHOLD'
  ].map((key) => normalizeDwarfholdKey(key))
);
  const normalizedStructureKey = normalizeDwarfholdKey(tile.structure);
  if (normalizedStructureKey && dwarfholdStructureKeys.has(normalizedStructureKey)) {
  const normalizedStructureType = normalizeDwarfholdKey(rawType);
  if (normalizedStructureType && dwarfholdStructureKeys.has(normalizedStructureType)) {
    const normalizedName = normalizeDwarfholdKey(tile.structureName);
      if (normalizedName.includes(key)) {
