function generateProfessionsFromGuilds(guildOptions, existingOptions = []) {
  const seenValues = new Set(existingOptions.map((p) => p.value));
const baseDwarfProfessionOptions = [
];

const dwarfProfessionOptions = baseDwarfProfessionOptions.concat(
  generateProfessionsFromGuilds(dwarfGuildOptions, baseDwarfProfessionOptions)
);
