    dwarfTestInstructions: document.querySelector(".dwarf-test-instructions"),
      clearMapEditorStructure: clearMapEditorStructure2,
      runWithLoadingScreen: runWithLoadingScreen2,
      generateAndRender: generateAndRender2
        if (event.target.value !== sanitisedValue.toString()) {
          event.target.value = sanitisedValue.toString();
        }
        sliderInputHandlers.forEach(({ input, valueElement, defaultValue, key }) => {
          if (!input) {
            return;
          }
          const rawValue = Number.parseInt(input.value, 10);
          const sanitisedValue = sanitizeFrequencyValue2(
            Number.isNaN(rawValue) ? state2.settings[key] : rawValue,
            defaultValue
          );
          state2.settings[key] = sanitisedValue;
          if (input.value !== sanitisedValue.toString()) {
            input.value = sanitisedValue.toString();
          }
          updateFrequencyDisplay2(valueElement, sanitisedValue);
        });
        const mapSizeKey = elements2.mapSizeSelect ? elements2.mapSizeSelect.value : state2.settings.mapSize;
        const mapSizePreset = getMapSizePreset2(mapSizeKey);
        const seedInputValue = elements2.seedInput ? elements2.seedInput.value.trim() : "";
        state2.settings.seedString = seedInputValue;
        state2.settings.lastSeedString = seedInputValue;
        updateWorldInfoSeedDisplay2(seedInputValue);
        if (elements2.worldSeedInput && elements2.worldSeedInput !== elements2.seedInput) {
          elements2.worldSeedInput.value = seedInputValue;
        }
        const previousSource = closeOptionsScreen2();
        if (previousSource === "game" && elements2.gameContainer) {
          runWithLoadingScreen2(() => generateAndRender2(), { statusText: "Updating the realm\u2026" }).catch((error) => {
            console.error("Failed to apply new world settings.", error);
          });
        }
  var defaultLoadingStatusMessage = "Calculating terrain layers\u2026";
  var realmNameAdjectives = [
    "Azure",
    "Gilded",
    "Obsidian",
    "Verdant",
    "Crimson",
    "Sable",
    "Ivory",
    "Stormborn",
    "Radiant",
    "Umbral",
    "Ember",
    "Frostbound",
    "Sunlit",
    "Twilight",
    "Shattered",
    "Celestial",
    "Runed",
    "Eclipsed"
  ];
  var realmNameNouns = [
    "Dominion",
    "Compact",
    "Marches",
    "Concord",
    "Throne",
    "Hegemony",
    "Alliance",
    "Syndicate",
    "Banner",
    "Legion",
    "Pact",
    "Confederacy",
    "Circle",
    "Assembly",
    "Holdings",
    "Enclave",
    "Sovereignty",
    "Ward"
  ];
  var dwarfholdCuratedNames = [
    "Khazad\xC3\xBBn Kharn",
    "Dhurnomli B\xC3\xBBr",
    "Zarak-az-Garaz",
    "Bar\xC3\xBBn-karag",
    "Gund\xC3\xBBm Garmak",
    "Azar-khazad",
    "Th\xC3\xBBrdrim Duraz",
    "Kazad-grimil",
    "B\xC3\xAArd\xC3\xBBm Barak",
    "Zirak-khazad",
    "Uzbad-az-Narg",
    "Karag Gor",
    "D\xC3\xBBmth\xC3\xBBr M\xC3\xAEn",
    "G\xC3\xBBnd\xC3\xA2l Grum",
    "Thr\xC3\xA2ng-khazad",
    "Khir\xC3\xBBn-karag",
    "Gazad-az-B\xC3\xB4r",
    "D\xC3\xBBrgrim D\xC3\xBBm",
    "Baz\xC3\xA2r-durin",
    "Kharak-khazad",
    "Th\xC3\xBBrd\xC3\xBBn Thrum",
    "Gaz\xC3\xBBl-d\xC3\xBBm",
    "Gor D\xC3\xBBrgheled",
    "Kh\xC3\xBBrmak D\xC3\xBBm",
    "Barak-d\xC3\xBBr\xC3\xBBn",
    "Gadrin-karag",
    "Morn\xC3\xBBl Khazad",
    "Thar\xC3\xBBm Bar\xC3\xBBn",
    "D\xC3\xBBr-az-Gor",
    "K\xC3\xBBzad Thrang",
    "Grumkhaz D\xC3\xBBm",
    "Nar\xC3\xBBm-barak",
    "Kh\xC3\xBBldar Narg",
    "Az\xC3\xBBl-az-Khazad",
    "D\xC3\xBBmthr\xC3\xBBn Garaz",
    "Grom-d\xC3\xBBrin",
    "Khazd\xC3\xBBl Garm",
    "Burin-d\xC3\xBBm",
    "Zarak-n\xC3\xA2l",
    "Thuld\xC3\xBBn Karag",
    "Durgr\xC3\xBBn Khazad",
    "Garak-d\xC3\xBBm",
    "Tharn-az-D\xC3\xBBr",
    "Khar\xC3\xBBm Grimd\xC3\xBBm",
    "Balz\xC3\xBBr Kar\xC3\xBBn",
    "M\xC3\xBBrkhaz Barak",
    "Thr\xC3\xBBm-az-Garaz",
    "Gund\xC3\xBBl-d\xC3\xBBm",
    "B\xC3\xA2rgrin Khazad",
    "D\xC3\xBBmbar Th\xC3\xBBr",
    "N\xC3\xBBrgrim Karag",
    "Th\xC3\xBBl\xC3\xBBm D\xC3\xBBr\xC3\xBBn",
    "Kharn-d\xC3\xBBm-n\xC3\xA2l",
    "Throgar-M\xC3\xA2l",
    "Krund\xC3\xBBn Barak",
    "D\xC3\xBBrkhal Varrum",
    "Ghazd\xC3\xBBr Grimbar",
    "Kuld\xC3\xBBn-D\xC3\xBBr",
    "Brak\xC3\xBBl Thrang",
    "Zarnak-d\xC3\xBBm",
    "Throldar Kharn",
    "M\xC3\xBBld\xC3\xBBn Grakhaz",
    "Durm\xC3\xBBr Bar\xC3\xBBn",
    "Mer\xC3\xBBn Barin",
    "D\xC3\xBBldar Harn\xC3\xBBm",
    "Bronar\xC3\xBBm",
    "Kharal\xC3\xBBn D\xC3\xBBr",
    "Gar\xC3\xBBn-kaz",
    "Th\xC3\xBBrli Bar\xC3\xBBn",
    "Balnar D\xC3\xBBm",
    "Or\xC3\xBBn Khazal",
    "D\xC3\xBBmren Th\xC3\xBBr",
    "Beld\xC3\xBBr Kar\xC3\xBBn",
    "Uld\xC3\xBBm Nargaz",
    "Khard\xC3\xBBl Barz\xC3\xBBn",
    "Th\xC3\xBBrk\xC3\xBBn-M\xC3\xB4r",
    "Zuldar\xC3\xBBn",
    "D\xC3\xBBrthang Khar\xC3\xBBz",
    "Br\xC3\xBBm-d\xC3\xBBl",
    "G\xC3\xBBld\xC3\xBBn Thazrak",
    "Khaz\xC3\xBBr-Dumli",
    "Thr\xC3\xBBn\xC3\xBBl Bar\xC3\xBBz",
    "M\xC3\xBBrzan-D\xC3\xBBm",
    "Grend\xC3\xBBl Varrin",
    "Kharnfell",
    "D\xC3\xBBmholm",
    "Barakdel",
    "Th\xC3\xBBrd\xC3\xBBn Holdfast",
    "Gromir Kar\xC3\xBBn",
    "Khar\xC3\xBBm Tor",
    "Thulgar's Deep",
    "Brumkeld\xC3\xBBm",
    "D\xC3\xBBrmar Hollow",
    "the Great Halls of Thorbardin"
  ];
  var dwarfholdNameRegions = [
    "the North",
    "the Deep",
    "the First Kings",
    "the Ancients",
    "Stonehome",
    "Stormpeak",
    "Ember Range",
    "Thunderholt",
    "the Underway",
    "Skyforge",
    "the Iron Sea",
    "Grimspire",
    "Highstone",
    "Runecrest",
    "the Brass Line"
  ];
  var dwarfholdRulerTitles = {
    female: [
      "High Thane",
      "Forge Matron",
      "Hearthmother",
      "Deepwarden",
      "Queen",
      "Thane",
      "High Queen"
    ],
    male: [
      "High Thane",
      "Forge Lord",
      "Mountain King",
      "Deepwarden",
      "Thane",
      "King",
      "King Under The Mountain",
      "Prince",
      "High Runesmith"
    ]
  };
  var darkDwarfholdLeaderTitles = [
    "Emperor",
    "Sorcerer-Thane",
    "Warlork High Lord",
    "Sorcerer-Prophet",
    "Lawgiver",
    "Dark-Thane"
  ];
  var dwarfholdHallmarks = [
    "Renowned for adamantine vaults that hum with runic wards.",
    "Brews ember-ale said to warm even a dragonborn heart.",
    "Forges battleaxes tempered in magmafall cascades.",
    "Gemcutters here carve prisms that sing when struck.",
    "Hosts archives of rune-scribed lore older than empires.",
    "Its sentry golems stand watch over sealed deep-gates.",
    "Stonewrights sculpt living statues of honoured ancestors.",
    "Traders deal in starlight opals mined from midnight caverns.",
    "Their forges are stoked by dragonfire bound in crystal cages.",
    "Tunnel gardens yield luminous mushrooms for distant markets."
  ];
  var dwarfholdExportOptions = [
    "Cut gemstones and faceted crystals",
    "Masterwork steel arms and armor",
    "Runic circuitry and precision mechanisms",
    "Barrels of triple-aged stout and spirits",
    "Thunderpowder and blasting charges",
    "Refined mithril ingots and alloys",
    "Architectural plans and rune-etched stonework",
    "Highland woolens and leatherwork",
    "Engraved jewelry and heirloom trinkets"
  ];
  var dwarfholdOccupationRaces = [
    { key: "orcs", label: "Orcs", color: "#6b8f23" },
    { key: "trolls", label: "Trolls", color: "#4f6d7a" },
    { key: "ratkin", label: "Ratkin", color: "#7b5e57" },
    { key: "kobolds", label: "Kobolds", color: "#b1c8ff" }
  ];
  function shuffleArray(array, random) {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    const randomFn = typeof random === "function" ? random : Math.random;
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(randomFn() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function generateRealmName(random) {
    const randomFn = typeof random === "function" ? random : Math.random;
    const adjective = pickRandomFrom(realmNameAdjectives, randomFn);
    const noun = pickRandomFrom(realmNameNouns, randomFn);
    if (adjective && noun) {
      return `${adjective} ${noun}`;
    } else if (noun) {
      return noun;
    } else if (adjective) {
      return `${adjective} Realm`;
    }
    return "The Realm";
  }
  function generateDwarfholdName(random) {
    const randomFn = typeof random === "function" ? random : Math.random;
    if (Array.isArray(dwarfholdCuratedNames) && dwarfholdCuratedNames.length > 0) {
      const curatedRoll = randomFn();
      if (curatedRoll < 0.8) {
        const curatedName = pickRandomFrom(dwarfholdCuratedNames, randomFn);
        if (typeof curatedName === "string" && curatedName.length > 0) {
          return curatedName;
        }
      }
    }
    const prefix = pickRandomFrom(dwarfholdNamePrefixes, randomFn) || "Stone";
    const suffix = pickRandomFrom(dwarfholdNameSuffixes, randomFn) || "hold";
    const baseName = `${prefix}${suffix}`;
    const descriptor = pickRandomFrom(dwarfholdNameDescriptors, randomFn);
    const region = pickRandomFrom(dwarfholdNameRegions, randomFn);
    const styleRoll = randomFn();
    if (styleRoll < 0.4 && descriptor) {
      return `${baseName} ${descriptor}`;
    }
    if (styleRoll < 0.8 && region) {
      return `${baseName} of ${region}`;
    }
    if (descriptor && styleRoll < 0.95) {
      return `${baseName} ${descriptor}`;
    }
    return baseName;
  }
  function generateDwarfholdDetails(name, random, options = {}) {
    var _a;
    const randomFn = typeof random === "function" ? random : Math.random;
    const isAbandoned = Boolean(options && options.isAbandoned);
    const isDarkHold = Boolean(options && options.isDarkHold);
    if (isAbandoned) {
      const variantRoll = randomFn();
      if (variantRoll < 0.33) {
        return {
          type: "abandonedDwarfhold",
          classification: "Abandoned Dwarfhold",
          name,
          population: 0,
          populationLabel: "Population",
          populationDescriptor: "residents",
          isSettlement: true,
          ruler: null,
          foundedYearsAgo: null,
          prominentClan: null,
          prominentGroup: null,
          prominentGroupLabel: null,
          hallmark: "Empty halls lie silent beneath the mountain.",
          majorGuilds: [],
          majorExports: [],
          populationBreakdown: [],
          description: "Dust-choked corridors and sealed vaults are all that remain of the dwarves who once dwelt here."
        };
      }
      if (variantRoll < 0.66) {
        const hasSurvivors = randomFn() < 0.45;
        const ruinedPopulation = hasSurvivors ? Math.max(8, Math.floor(20 + randomFn() * 220)) : 0;
        const ruinedBreakdown = hasSurvivors ? [
          {
            key: "dwarves",
            label: "Dwarves",
            population: ruinedPopulation,
            percentage: 1,
            color: defaultCultureColorByKey.dwarves
          }
        ] : [];
        return {
          type: "ruinedDwarfhold",
          classification: "Ruined Dwarfhold",
          name,
          population: ruinedPopulation,
          populationLabel: "Population",
          populationDescriptor: "residents",
          isSettlement: true,
          ruler: null,
          foundedYearsAgo: null,
          prominentClan: null,
          prominentGroup: null,
          prominentGroupLabel: null,
          hallmark: "Collapsed chambers and shattered gates hint at the calamity that broke the hold.",
          majorGuilds: [],
          majorExports: [],
          populationBreakdown: ruinedBreakdown,
          description: hasSurvivors ? "A battered handful of survivors keep watch over the broken halls." : "Only ruins and echoes remain after the fall of this hold."
        };
      }
      const occupation = pickRandomFrom(dwarfholdOccupationRaces, randomFn) || dwarfholdOccupationRaces[0];
      const occupationLabel = (occupation == null ? void 0 : occupation.label) || "Orcs";
      const occupationKey = (occupation == null ? void 0 : occupation.key) || "orcs";
      const occupationColor = (occupation == null ? void 0 : occupation.color) || "#6b8f23";
      const occupiedPopulation = Math.max(40, Math.floor(120 + randomFn() * 1500));
      const occupiedBreakdown = [
        {
          key: occupationKey,
          label: occupationLabel,
          population: occupiedPopulation,
          percentage: 1,
          color: occupationColor
        }
      ];
      const occupationDescriptor = occupationLabel.toLowerCase();
      return {
        type: "occupiedDwarfhold",
        classification: "Occupied Dwarfhold",
        name,
        population: occupiedPopulation,
        populationLabel: "Population",
        populationDescriptor: "residents",
        isSettlement: true,
        ruler: null,
        foundedYearsAgo: null,
        prominentClan: null,
        prominentGroup: null,
        prominentGroupLabel: null,
        hallmark: `Warbands of ${occupationDescriptor} have claimed these once-dwarven halls.`,
        majorGuilds: [],
        majorExports: [],
        populationBreakdown: occupiedBreakdown,
        description: `${occupationLabel} have seized the hold and repurposed its vaulted chambers as their lair.`
      };
    }
    const population = Math.max(120, Math.floor(450 + randomFn() * 4200));
    const genderRoll = randomFn();
    const gender = genderRoll < 0.9 ? "male" : "female";
    const namePool = dwarfNamePools[gender] || dwarfNamePools.male;
    const firstName = pickRandomFrom(namePool, randomFn) || "Urist";
    const clanOption = pickRandomFrom(dwarfOptions.clan, randomFn) || ((_a = dwarfOptions.clan) == null ? void 0 : _a[0]);
    const clanName = (clanOption == null ? void 0 : clanOption.label) || "Stonebeard";
    let rulerTitle;
    if (isDarkHold) {
      rulerTitle = pickRandomFrom(darkDwarfholdLeaderTitles, randomFn) || "Sorcerer-Prophet";
    } else {
      const titlePool = dwarfholdRulerTitles[gender] || dwarfholdRulerTitles.male;
      const titleFallback = "Thane";
      const thaneBiasRoll = randomFn();
      const nonThaneTitles = titlePool.filter((title) => title !== "Thane");
      rulerTitle = thaneBiasRoll < 0.65 || nonThaneTitles.length === 0 ? "Thane" : pickRandomFrom(nonThaneTitles, randomFn) || titleFallback;
    }
    const hallmark = pickRandomFrom(dwarfholdHallmarks, randomFn) || "Renowned for stout walls and heartier spirits.";
    const foundedYearsAgo = Math.max(30, Math.floor(80 + randomFn() * 3921));
    const prominentClanOption = randomFn() < 0.35 ? pickRandomFrom(dwarfOptions.clan, randomFn) : clanOption;
    const prominentClan = (prominentClanOption == null ? void 0 : prominentClanOption.label) || clanName;
    const majorGuildCount = clamp(Math.floor(2 + randomFn() * 3), 1, dwarfGuildOptions.length);
    const majorGuilds = pickUniqueFrom(
      dwarfGuildOptions.map((option) => option.label),
      majorGuildCount,
      randomFn
    );
    const majorExportCount = clamp(Math.floor(2 + randomFn() * 2), 1, dwarfholdExportOptions.length);
    const majorExports = pickUniqueFrom(dwarfholdExportOptions, majorExportCount, randomFn);
    const majorClanPool = Array.isArray(dwarfOptions == null ? void 0 : dwarfOptions.clan) ? dwarfOptions.clan.map((option) => option == null ? void 0 : option.label).filter((label) => typeof label === "string" && label.trim()) : [];
    let majorClans = [];
    if (majorClanPool.length > 0) {
      const targetCount = clamp(Math.floor(2 + randomFn() * 3), 2, majorClanPool.length);
      const available = majorClanPool.filter((label) => label !== prominentClan);
      const additional = pickUniqueFrom(available, Math.max(0, targetCount - 1), randomFn);
      majorClans = [prominentClan, ...additional];
    }
    if (majorClans.length > 0) {
      majorClans = Array.from(new Set(majorClans));
    }
    const majorClansDescription = formatListWithConjunction(majorClans);
    const description = majorClansDescription ? `Major clans represented: ${majorClansDescription}.` : null;
    const populationBreakdown = generateDwarfholdPopulationBreakdown(population, randomFn, {
      hasNearbyHumanSettlement: Boolean(options && options.hasNearbyHumanSettlement)
    });
    const clanBreakdown = generateLabelBreakdown(majorClans, randomFn, {
      keyPrefix: "clan",
      colorSeed: "clan"
    });
    const guildBreakdown = generateLabelBreakdown(majorGuilds, randomFn, {
      keyPrefix: "guild",
      colorSeed: "guild"
    });
    const classification = population >= 4e3 ? "greatDwarfhold" : "dwarfhold";
    const classificationLabel = classification === "greatDwarfhold" ? "Great Dwarfhold" : "Dwarfhold";
    const baseDetails = {
      type: classification,
      classification: classificationLabel,
      name,
      population,
      populationLabel: "Population",
      populationDescriptor: "residents",
      isSettlement: true,
      ruler: {
        title: rulerTitle,
        name: `${firstName} ${clanName}`
      },
      foundedYearsAgo,
      prominentClan,
      prominentGroup: prominentClan,
      prominentGroupLabel: "Prominent Clan",
      hallmark,
      majorGuilds,
      majorExports,
      majorClans,
      majorClansLabel: "Major Clans",
      populationBreakdown,
      clanBreakdown,
      guildBreakdown,
      description
    };
    if (isDarkHold) {
      const moltenExports = Array.isArray(baseDetails.majorExports) ? baseDetails.majorExports.slice() : [];
      moltenExports.push("Obsidian Ingots");
      moltenExports.push("Sulfur-Glass Relics");
      const uniqueExports = Array.from(new Set(moltenExports));
      const augmentedGuilds = Array.isArray(baseDetails.majorGuilds) ? Array.from(/* @__PURE__ */ new Set([...baseDetails.majorGuilds, "Ashforged Covenant"])) : ["Ashforged Covenant"];
      const darkPopulationBreakdown = Array.isArray(baseDetails.populationBreakdown) ? baseDetails.populationBreakdown.map(
        (entry) => entry && entry.key === "dwarves" ? {
          ...entry,
          label: "Dark Dwarves",
          color: "#3b2a3d"
        } : entry
      ) : [];
      const darkHallmark = `${baseDetails.hallmark} Magma channels drawn from nearby volcanoes keep their forges blazing.`;
      const darkDescription = baseDetails.description ? `${baseDetails.description} Ash-stained banners and magma sluices define every hall.` : "Ash-stained banners and magma sluices define every hall.";
      return {
        ...baseDetails,
        type: "darkDwarfhold",
        classification: "Dark Dwarfhold",
        populationDescriptor: "residents",
        majorExports: uniqueExports,
        majorGuilds: augmentedGuilds,
        populationBreakdown: darkPopulationBreakdown,
        hallmark: darkHallmark,
        description: darkDescription
      };
    }
    return baseDetails;
  }
    const signature = structureHighlightTypeKeys.map((key) => {
      const group = structureHighlightGroups[key];
      const label = group && typeof group.label === "string" ? group.label : "";
      const color = group && typeof group.color === "string" ? group.color : "";
      return `${key}:${label}:${color}`;
    }).join("|");
    if (signature === lastStructureHighlightMenuSignature) {
      return;
    }
    lastStructureHighlightMenuSignature = signature;
    const existingOptions = menu.querySelectorAll(".structure-highlight-option");
    existingOptions.forEach((option) => option.remove());
    const fragment = document.createDocumentFragment();
    structureHighlightTypeKeys.forEach((typeKey) => {
      const group = structureHighlightGroups[typeKey];
      if (!group) {
        return;
      }
      const optionId = `highlight-structure-${typeKey}`;
      const label = document.createElement("label");
      label.className = "structure-highlight-option";
      label.setAttribute("for", optionId);
      label.setAttribute("data-highlight-option", typeKey);
      if (group.color) {
        label.style.setProperty("--highlight-color", group.color);
      }
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = optionId;
      input.name = optionId;
      input.setAttribute("data-highlight-type", typeKey);
      const swatch = document.createElement("span");
      swatch.className = "structure-highlight-option__swatch";
      swatch.setAttribute("aria-hidden", "true");
      const text = document.createElement("span");
      text.className = "structure-highlight-option__label";
      text.textContent = group.label || typeKey;
      label.appendChild(input);
      label.appendChild(swatch);
      label.appendChild(text);
      fragment.appendChild(label);
    });
    const hint = menu.querySelector(".structure-highlight-menu__hint");
    if (hint && hint.parentNode === menu) {
      menu.insertBefore(fragment, hint.nextSibling);
    } else {
      menu.appendChild(fragment);
    }
  }
  var loadingProgressValue = 0;
  var loadingProgressIntervalId = null;
  var hasManualLoadingProgress = false;
  var localViewConfig = {
    radius: 4,
    baseScale: 3,
    minScale: 2,
    maxCanvasSize: 768,
    highResolutionTileSubdivisions: 4,
    highResolutionExtraPadding: 2,
    highResolutionMinScale: 2,
    highResolutionMaxTileSize: 28,
    minZoom: 0.5,
    maxZoom: 3,
    zoomStep: 0.2,
    defaultZoom: 1,
    absoluteMinScale: 0.5,
    structureScaleCap: 1
  };
  var {
    state,
    ensureMapEditorState,
    refreshMapEditorUI,
    toggleMapEditor,
    closeMapEditor,
    setMapEditorTerrainKey,
    setMapEditorStructureKey,
    setMapEditorApplyTerrain,
    setMapEditorApplyStructure,
    setMapEditorBrushSize,
    clearMapEditorStructure,
    applyMapEditorPaint,
    ensureStructureHighlightState
  } = createStateModule({
    tileSheets,
    defaultMapSize,
    defaultForestFrequency,
    defaultMountainFrequency,
    defaultWorldGenerationType,
    localViewConfig,
    clamp,
    elements,
    hideStructureContextMenu,
    hideMapTooltip,
    drawWorld,
    structureHighlightGroups,
    structureHighlightTypeKeys,
    baseTileCoords,
    documentRef: typeof document !== "undefined" ? document : null
  });
  var customizerDeps = null;
  function computeFrequencyMultiplier(frequency) {
    const normalized = clamp(frequency / 100, 0, 1);
    return 0.5 + normalized * 1.5;
  }
  function sampleRange(rng, range, defaultMin, defaultMax) {
    if (!rng || typeof rng !== "function") {
      rng = Math.random;
    }
    let min = defaultMin;
    let max = defaultMax;
    if (Array.isArray(range) && range.length >= 2) {
      if (Number.isFinite(range[0])) {
        min = range[0];
      }
      if (Number.isFinite(range[1])) {
        max = range[1];
      }
    } else if (Number.isFinite(range)) {
      return range;
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      min = defaultMin;
      max = defaultMax;
    }
    if (max <= min) {
      return min;
    }
    return min + rng() * (max - min);
  }
  function computeDwarfholdDistributionAdjustment(x, y, height, seed) {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(height) || height <= 0) {
      return 0;
    }
    if (!Number.isFinite(seed)) {
      seed = 0;
    }
    const hash = (x * 73856093 ^ y * 19349663 ^ seed * 83492791) >>> 0;
    const normalized = hash % 1e6 / 1e6;
    const verticalBias = y / height * 2 - 1;
    const noise = (normalized - 0.5) * 0.15;
    const verticalAdjustment = verticalBias * 0.05;
    return noise + verticalAdjustment;
  }
  function computeStructurePlacementLimit(baseTarget, maxLimit, multiplier) {
    if (!Number.isFinite(baseTarget) || baseTarget <= 0) {
      baseTarget = 1;
    }
    if (!Number.isFinite(maxLimit) || maxLimit <= 0) {
      maxLimit = 1;
    }
    if (!Number.isFinite(multiplier) || multiplier <= 0) {
      multiplier = 1;
    }
    const adjusted = baseTarget * multiplier;
    return Math.max(1, Math.min(Math.round(adjusted), maxLimit));
  }
  function computeAbandonedDwarfholdChance(frequencyNormalized) {
    if (!Number.isFinite(frequencyNormalized)) {
      frequencyNormalized = 0.5;
    }
    const clamped = clamp(frequencyNormalized, 0, 1);
    const minChance = 0.05;
    const maxChance = 0.35;
    const chance = maxChance - clamped * (maxChance - minChance);
    return clamp(chance, minChance, maxChance);
  }
  function adjustMinDistance(baseDistance, frequencyNormalized) {
    if (!Number.isFinite(baseDistance) || baseDistance <= 0) {
      return 6;
    }
    if (!Number.isFinite(frequencyNormalized)) {
      frequencyNormalized = 0.5;
    }
    const clamped = clamp(frequencyNormalized, 0, 1);
    const minMultiplier = 0.7;
    const maxMultiplier = 1.2;
    const multiplier = maxMultiplier - clamped * (maxMultiplier - minMultiplier);
    const adjusted = baseDistance * multiplier;
    return Math.max(1, Math.round(adjusted));
  }
  function computeNearestDistanceSq(x, y, points) {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Array.isArray(points) || points.length === 0) {
      return Infinity;
    }
    let minDistSq = Infinity;
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
        continue;
      }
      const dx = x - point.x;
      const dy = y - point.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < minDistSq) {
        minDistSq = distSq;
      }
    }
    return minDistSq;
  }
  function findNearestPointWithDetails(x, y, points) {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Array.isArray(points) || points.length === 0) {
      return null;
    }
    let nearest = null;
    let minDistSq = Infinity;
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
        continue;
      }
      const dx = x - point.x;
      const dy = y - point.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < minDistSq) {
        minDistSq = distSq;
        nearest = point;
      }
    }
    if (!nearest) {
      return null;
    }
    return {
      ...nearest,
      distance: Math.sqrt(minDistSq),
      distanceSq: minDistSq
    };
  }
  function escapeHtml(text) {
    if (text == null || text === void 0) {
      return "";
    }
    const str = String(text);
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function findPathBetweenPoints(startX, startY, endX, endY, options) {
    if (!Number.isFinite(startX) || !Number.isFinite(startY) || !Number.isFinite(endX) || !Number.isFinite(endY)) {
      return null;
    }
    const {
      tiles,
      width,
      height,
      waterMask,
      isLandBaseTile,
      maxDistance
    } = options || {};
    if (!Array.isArray(tiles) || !Number.isFinite(width) || !Number.isFinite(height)) {
      return null;
    }
    if (startX < 0 || startX >= width || startY < 0 || startY >= height || endX < 0 || endX >= width || endY < 0 || endY >= height) {
      return null;
    }
    const startIdx = startY * width + startX;
    const endIdx = endY * width + endX;
    if (waterMask && (waterMask[startIdx] || waterMask[endIdx])) {
      return null;
    }
    const startTile = tiles[startY] && tiles[startY][startX];
    const endTile = tiles[endY] && tiles[endY][endX];
    if (!startTile || !endTile) {
      return null;
    }
    if (isLandBaseTile && (!isLandBaseTile(startTile.base) || !isLandBaseTile(endTile.base))) {
      return null;
    }
    const dx = endX - startX;
    const dy = endY - startY;
    const distSq = dx * dx + dy * dy;
    if (Number.isFinite(maxDistance) && distSq > maxDistance * maxDistance) {
      return null;
    }
    const path = [];
    let x0 = Math.round(startX);
    let y0 = Math.round(startY);
    let x1 = Math.round(endX);
    let y1 = Math.round(endY);
    const dx1 = Math.abs(x1 - x0);
    const dy1 = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx1 - dy1;
    let x = x0;
    let y = y0;
    while (true) {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const idx = y * width + x;
        if (!waterMask || !waterMask[idx]) {
          const tile = tiles[y] && tiles[y][x];
          if (tile && (!isLandBaseTile || isLandBaseTile(tile.base))) {
            path.push({ x, y });
          }
        }
      }
      if (x === x1 && y === y1) {
        break;
      }
      const e2 = 2 * err;
      if (e2 > -dy1) {
        err -= dy1;
        x += sx;
      }
      if (e2 < dx1) {
        err += dx1;
        y += sy;
      }
    }
    return path.length > 0 ? path : null;
  }
  function connectTownsWithinRange(tiles, settlements, options) {
    if (!Array.isArray(tiles) || !Array.isArray(settlements) || settlements.length < 2) {
      return;
    }
    const {
      maxDistance = 25,
      overlayKey = "TOWN_ROAD",
      width,
      height,
      isLandBaseTile,
      waterMask,
      replaceableOverlays
    } = options || {};
    if (!Number.isFinite(width) || !Number.isFinite(height) || !Number.isFinite(maxDistance)) {
      return;
    }
    const connections = [];
    for (let i = 0; i < settlements.length; i += 1) {
      const from = settlements[i];
      if (!from || !Number.isFinite(from.x) || !Number.isFinite(from.y)) {
        continue;
      }
      for (let j = i + 1; j < settlements.length; j += 1) {
        const to = settlements[j];
        if (!to || !Number.isFinite(to.x) || !Number.isFinite(to.y)) {
          continue;
        }
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        if (dist <= maxDistance) {
          connections.push({ from, to, dist });
        }
      }
    }
    connections.sort((a, b) => a.dist - b.dist);
    const connectedPairs = /* @__PURE__ */ new Set();
    for (let i = 0; i < connections.length; i += 1) {
      const { from, to } = connections[i];
      const fromKey = `${from.x},${from.y}`;
      const toKey = `${to.x},${to.y}`;
      const pairKey = `${fromKey}-${toKey}`;
      const reversePairKey = `${toKey}-${fromKey}`;
      if (connectedPairs.has(pairKey) || connectedPairs.has(reversePairKey)) {
        continue;
      }
      const path = findPathBetweenPoints(from.x, from.y, to.x, to.y, {
        tiles,
        width,
        height,
        waterMask,
        isLandBaseTile,
        maxDistance
      });
      if (!path || path.length === 0) {
        continue;
      }
      connectedPairs.add(pairKey);
      for (let p = 0; p < path.length; p += 1) {
        const { x, y } = path[p];
        if (x < 0 || x >= width || y < 0 || y >= height) {
          continue;
        }
        const row = tiles[y];
        if (!Array.isArray(row)) {
          continue;
        }
        const tile = row[x];
        if (!tile) {
          continue;
        }
        if (tile.overlay === overlayKey) {
          continue;
        }
        if (tile.structure) {
          continue;
        }
        if (replaceableOverlays && replaceableOverlays.has(tile.overlay)) {
          tile.overlay = overlayKey;
        } else if (!tile.overlay) {
          tile.overlay = overlayKey;
        }
      }
    }
  }
  function tryPlaceDwarfhold(candidate, context) {
    if (!candidate || !Number.isFinite(candidate.x) || !Number.isFinite(candidate.y)) {
      return false;
    }
    if (!context || !Array.isArray(context.tiles) || !Array.isArray(context.placed)) {
      return false;
    }
    const { x, y } = candidate;
    const {
      tiles,
      width,
      height,
      waterMask,
      placed,
      minDistanceSq,
      dwarfholdKey,
      darkDwarfholdKey,
      greatDwarfholdKey,
      abandonedDwarfholdKey,
      abandonedDwarfholdChance,
      rng,
      dwarfholds,
      towns,
      nearbyTownDistanceSq,
      darkDwarfholdVolcanoRadius: darkDwarfholdVolcanoRadius2
    } = context;
    if (x < 0 || x >= width || y < 0 || y >= height) {
      return false;
    }
    const idx = y * width + x;
    if (waterMask && waterMask[idx]) {
      return false;
    }
    const row = tiles[y];
    if (!Array.isArray(row)) {
      return false;
    }
    const tile = row[x];
    if (!tile || tile.structure || tile.river) {
      return false;
    }
    if (Number.isFinite(minDistanceSq) && minDistanceSq > 0) {
      for (let i = 0; i < placed.length; i += 1) {
        const other = placed[i];
        if (!other || !Number.isFinite(other.x) || !Number.isFinite(other.y)) {
          continue;
        }
        const dx = x - other.x;
        const dy = y - other.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < minDistanceSq) {
          return false;
        }
      }
    }
    if (Number.isFinite(nearbyTownDistanceSq) && nearbyTownDistanceSq > 0 && Array.isArray(towns)) {
      for (let i = 0; i < towns.length; i += 1) {
        const town = towns[i];
        if (!town || !Number.isFinite(town.x) || !Number.isFinite(town.y)) {
          continue;
        }
        const dx = x - town.x;
        const dy = y - town.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < nearbyTownDistanceSq) {
          return false;
        }
      }
    }
    const randomFn = rng || Math.random;
    let structureKey = dwarfholdKey;
    let isAbandoned = false;
    let isDark = false;
    let isGreat = false;
    if (darkDwarfholdKey && darkDwarfholdVolcanoRadius2) {
      const volcanoRadiusSq = darkDwarfholdVolcanoRadius2 * darkDwarfholdVolcanoRadius2;
      for (let ty = Math.max(0, y - darkDwarfholdVolcanoRadius2); ty <= Math.min(height - 1, y + darkDwarfholdVolcanoRadius2); ty += 1) {
        for (let tx = Math.max(0, x - darkDwarfholdVolcanoRadius2); tx <= Math.min(width - 1, x + darkDwarfholdVolcanoRadius2); tx += 1) {
          const checkTile = tiles[ty] && tiles[ty][tx];
          if (checkTile && isVolcanoOverlayKey(checkTile.overlay)) {
            const dx = tx - x;
            const dy = ty - y;
            if (dx * dx + dy * dy <= volcanoRadiusSq) {
              isDark = true;
              structureKey = darkDwarfholdKey;
              break;
            }
          }
        }
        if (isDark) {
          break;
        }
      }
    }
    if (!isDark && greatDwarfholdKey && candidate.score > 0.75) {
      const greatRoll = randomFn();
      if (greatRoll < 0.15) {
        isGreat = true;
        structureKey = greatDwarfholdKey;
      }
    }
    if (!isDark && !isGreat && abandonedDwarfholdKey && Number.isFinite(abandonedDwarfholdChance)) {
      const abandonRoll = randomFn();
      if (abandonRoll < abandonedDwarfholdChance) {
        isAbandoned = true;
        structureKey = abandonedDwarfholdKey;
      }
    }
    if (!structureKey) {
      return false;
    }
    const name = generateDwarfholdName(randomFn);
    const nearestHoldInfo = findNearestPointWithDetails(x, y, dwarfholds || []);
    const hasNearbyHumanSettlement = Array.isArray(towns) && towns.length > 0 && computeNearestDistanceSq(x, y, towns) < (nearbyTownDistanceSq || Infinity);
    const details = generateDwarfholdDetails(name, randomFn, {
      isAbandoned,
      isDarkHold: isDark,
      isGreatHold: isGreat,
      nearestDwarfhold: nearestHoldInfo,
      hasNearbyHumanSettlement
    });
    tile.structure = structureKey;
    tile.structureName = name;
    tile.structureDetails = details;
    placed.push(candidate);
    if (Array.isArray(dwarfholds)) {
      dwarfholds.push({ x, y, ...details });
    }
    return true;
  }
  function computeEuclideanDistanceField(mask, width, height) {
    if (!mask || !Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      return new Float32Array(0);
    }
    const size = width * height;
    const distanceField = new Float32Array(size);
    for (let i = 0; i < size; i += 1) {
      distanceField[i] = mask[i] ? 0 : Number.MAX_VALUE;
    }
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (distanceField[idx] === 0) {
          continue;
        }
        let minDist = distanceField[idx];
        if (x > 0) {
          const leftIdx = idx - 1;
          const dist = distanceField[leftIdx] + 1;
          if (dist < minDist) {
            minDist = dist;
          }
        }
        if (y > 0) {
          const topIdx = idx - width;
          const dist = distanceField[topIdx] + 1;
          if (dist < minDist) {
            minDist = dist;
          }
        }
        if (x > 0 && y > 0) {
          const diagIdx = idx - width - 1;
          const dist = distanceField[diagIdx] + Math.SQRT2;
          if (dist < minDist) {
            minDist = dist;
          }
        }
        if (x < width - 1 && y > 0) {
          const diagIdx = idx - width + 1;
          const dist = distanceField[diagIdx] + Math.SQRT2;
          if (dist < minDist) {
            minDist = dist;
          }
        }
        distanceField[idx] = minDist;
      }
    }
    for (let y = height - 1; y >= 0; y -= 1) {
      for (let x = width - 1; x >= 0; x -= 1) {
        const idx = y * width + x;
        if (distanceField[idx] === 0) {
          continue;
        }
        let minDist = distanceField[idx];
        if (x < width - 1) {
          const rightIdx = idx + 1;
          const dist = distanceField[rightIdx] + 1;
          if (dist < minDist) {
            minDist = dist;
          }
        }
        if (y < height - 1) {
          const bottomIdx = idx + width;
          const dist = distanceField[bottomIdx] + 1;
          if (dist < minDist) {
            minDist = dist;
          }
        }
        if (x > 0 && y < height - 1) {
          const diagIdx = idx + width - 1;
          const dist = distanceField[diagIdx] + Math.SQRT2;
          if (dist < minDist) {
            minDist = dist;
          }
        }
        if (x < width - 1 && y < height - 1) {
          const diagIdx = idx + width + 1;
          const dist = distanceField[diagIdx] + Math.SQRT2;
          if (dist < minDist) {
            minDist = dist;
          }
        }
        distanceField[idx] = minDist;
      }
    }
    for (let i = 0; i < size; i += 1) {
      const dist = distanceField[i];
      distanceField[i] = dist * dist;
    }
    return distanceField;
  }
  function sanitizeFrequencyValue(value, defaultValue) {
    if (typeof defaultValue !== "number" || !Number.isFinite(defaultValue)) {
      defaultValue = 50;
    }
    const fallback = clamp(defaultValue, 0, 100);
    if (typeof value === "string") {
      const parsed = Number.parseInt(value, 10);
      if (Number.isNaN(parsed)) {
        return fallback;
      }
      return clamp(parsed, 0, 100);
    }
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return fallback;
    }
    return clamp(value, 0, 100);
  }
  function updateFrequencyDisplay(element, value) {
    if (!element || typeof value !== "number" || !Number.isFinite(value)) {
      return;
    }
    const clampedValue = clamp(value, 0, 100);
    const percentage = Math.round(clampedValue);
    let label = "Balanced";
    if (clampedValue < 30) {
      label = "Very Low";
    } else if (clampedValue < 40) {
      label = "Low";
    } else if (clampedValue < 60) {
      label = "Balanced";
    } else if (clampedValue < 75) {
      label = "High";
    } else {
      label = "Very High";
    }
    if (element && typeof element.textContent !== "undefined") {
      element.textContent = `${percentage}% \u2014 ${label}`;
    }
  }
  var audioState = {
    isPlaying: false,
    currentIndex: 0,
    tracks: [],
    initialised: false,
    effectsMuted: false,
    effectsVolume: 0.6
  };
  var structureAmbienceState = {
    currentTrack: null
  };
  var soundEffects = {
    randomiseClick: null
  };
  function playSoundEffect(audio) {
    if (!audio || audioState.effectsMuted || audioState.effectsVolume <= 0) {
      return;
    }
    try {
      if (audio && typeof audio.play === "function") {
        audio.volume = clamp(audioState.effectsVolume, 0, 1);
        audio.play().catch(() => {
        });
      }
    } catch (error) {
    }
  }
  var defaultDwarfTestInstructionText = elements.dwarfTestInstructions && typeof elements.dwarfTestInstructions.textContent === "string" ? elements.dwarfTestInstructions.textContent.trim() : "Use the arrow keys or WASD to move your dwarf around the proving grounds.";
  var dwarfTestScenarios = {
    overworld: {
      mapPath: "maps/map1.tmj",
      tilesetFallbacks: /* @__PURE__ */ new Map([
        ["../../../../rpg-village-tileset v1.0 (wonderdot)/Tiled/Village_Tileset.tsx", "Village_Tileset.tsx"],
        ["Village_Tileset.tsx", "Village_Tileset.tsx"]
      ]),
      backgroundColor: "#10131c",
      instructions: defaultDwarfTestInstructionText
    },
    dungeon: {
      mapPath: "maps/battlemap.tmj",
      backgroundColor: "#050608",
      instructions: "The dungeon proving grounds are a work in progress. Explore the current arena layout while we forge new encounters."
    }
  };
  var dwarfTestResourceCache = /* @__PURE__ */ new Map();
  var dwarfTestState = {
    active: false,
    mode: "overworld"
  };
  function getDwarfTestScenario(key) {
    return dwarfTestScenarios[key] || dwarfTestScenarios.overworld;
  }
  function normalizeDwarfTestMode(value) {
    if (typeof value === "string") {
      const lowered = value.toLowerCase();
      if (lowered === "dungeon") {
        return "dungeon";
      }
      if (lowered === "overworld") {
        return "overworld";
      }
    }
    if (value === true) {
      return "dungeon";
    }
    return "overworld";
  }
  function setDwarfTestInstructions(message, { isError = false } = {}) {
    if (elements.dwarfTestInstructions) {
      elements.dwarfTestInstructions.textContent = message;
    }
    if (elements.dwarfTestArea) {
      if (isError) {
        elements.dwarfTestArea.setAttribute("data-error", "true");
      } else {
        elements.dwarfTestArea.removeAttribute("data-error");
      }
    }
  }
  function isDwarfTestActive() {
    return Boolean(dwarfTestState.active);
  }
  function toggleDwarfTest(requestedMode = "overworld") {
    const mode = normalizeDwarfTestMode(requestedMode);
    if (dwarfTestState.active && dwarfTestState.mode === mode) {
      closeDwarfTest();
      return;
    }
    closeDwarfTest();
    dwarfTestState.active = true;
    dwarfTestState.mode = mode;
    if (elements.dwarfTestArea) {
      elements.dwarfTestArea.classList.remove("hidden");
      elements.dwarfTestArea.setAttribute("aria-hidden", "false");
    }
    if (elements.dwarfTestCanvas) {
      elements.dwarfTestCanvas.setAttribute("aria-hidden", "true");
    }
    updateDwarfTestButtonState();
    startDwarfTestScenario(mode);
  }
  function closeDwarfTest(options = {}) {
    const { returnFocus = false } = options;
    if (!dwarfTestState.active) {
      return;
    }
    dwarfTestState.active = false;
    dwarfTestState.mode = "overworld";
    if (elements.dwarfTestArea) {
      elements.dwarfTestArea.classList.add("hidden");
      elements.dwarfTestArea.setAttribute("aria-hidden", "true");
    }
    if (elements.dwarfTestCanvas) {
      elements.dwarfTestCanvas.setAttribute("aria-hidden", "true");
      elements.dwarfTestCanvas.style.transform = "";
      elements.dwarfTestCanvas.style.transformOrigin = "";
    }
    setDwarfTestInstructions(defaultDwarfTestInstructionText);
    updateDwarfTestButtonState();
    if (returnFocus && elements.dwarfTestButton) {
      elements.dwarfTestButton.focus();
    }
  }
  function updateDwarfTestButtonState() {
    const isActive = isDwarfTestActive();
    if (elements.dwarfTestButton) {
      const pressed = isActive && dwarfTestState.mode === "overworld";
      elements.dwarfTestButton.setAttribute("aria-pressed", pressed ? "true" : "false");
    }
    if (elements.dwarfTestDungeonButton) {
      const pressed = isActive && dwarfTestState.mode === "dungeon";
      elements.dwarfTestDungeonButton.setAttribute("aria-pressed", pressed ? "true" : "false");
    }
  }
  async function ensureDwarfTestResources(mode) {
    if (typeof window === "undefined" || typeof fetch !== "function") {
      throw new Error("Dwarf test resources cannot be loaded without browser fetch support.");
    }
    const key = normalizeDwarfTestMode(mode);
    const cached = dwarfTestResourceCache.get(key);
    if (cached) {
      if (cached.data) {
        return cached.data;
      }
      return cached.promise;
    }
    const scenario = getDwarfTestScenario(key);
    const loadPromise = loadDwarfTestScenarioResources(scenario).then((data) => {
      dwarfTestResourceCache.set(key, { data });
      return data;
    }).catch((error) => {
      dwarfTestResourceCache.delete(key);
      throw error;
    });
    dwarfTestResourceCache.set(key, { promise: loadPromise });
    return loadPromise;
  }
  async function startDwarfTestScenario(mode) {
    const scenarioKey = normalizeDwarfTestMode(mode);
    const scenario = getDwarfTestScenario(scenarioKey);
    if (!elements.dwarfTestCanvas) {
      setDwarfTestInstructions(scenario.instructions || defaultDwarfTestInstructionText);
    setDwarfTestInstructions("Loading test arena\u2026");
    try {
      const resources = await ensureDwarfTestResources(scenarioKey);
      drawDwarfTestScenario(elements.dwarfTestCanvas, resources, scenario);
      elements.dwarfTestCanvas.setAttribute("aria-hidden", "false");
      setDwarfTestInstructions(scenario.instructions || defaultDwarfTestInstructionText);
    } catch (error) {
      console.error(`Failed to load ${scenarioKey} dwarf test arena`, error);
      elements.dwarfTestCanvas.setAttribute("aria-hidden", "true");
      setDwarfTestInstructions("Unable to load the test arena. Please try again later.", { isError: true });
    } finally {
      handleDwarfTestResize();
    }
  }
  async function loadDwarfTestScenarioResources(scenario) {
    const baseUrl = new URL(scenario.mapPath, window.location.href);
    const response = await fetch(baseUrl.href);
    if (!response.ok) {
      throw new Error(`Failed to load map "${scenario.mapPath}" (status ${response.status})`);
    }
    const mapData = await response.json();
    const tilesets = [];
    if (Array.isArray(mapData.tilesets)) {
      for (const tilesetRef of mapData.tilesets) {
        try {
          const descriptor = await loadDwarfTestTileset(tilesetRef, baseUrl, scenario, mapData);
          if (descriptor) {
            tilesets.push(descriptor);
          }
        } catch (error) {
          console.warn("Unable to load dwarf test tileset", (tilesetRef == null ? void 0 : tilesetRef.source) || tilesetRef, error);
        }
    }
    tilesets.sort((a, b) => a.firstgid - b.firstgid);
    return { map: mapData, tilesets };
  }
  async function loadDwarfTestTileset(tilesetRef, mapUrl, scenario, mapData) {
    if (!tilesetRef) {
      return null;
    }
    const mapTileWidth = (mapData == null ? void 0 : mapData.tilewidth) || 16;
    const mapTileHeight = (mapData == null ? void 0 : mapData.tileheight) || 16;
    if (typeof tilesetRef.source === "string" && tilesetRef.source.length > 0) {
      return loadExternalDwarfTestTileset(tilesetRef, mapUrl, scenario, mapTileWidth, mapTileHeight);
    }
    if (typeof tilesetRef.image === "string" && tilesetRef.image.length > 0) {
      const imageUrl = new URL(tilesetRef.image, mapUrl);
      const image = await loadImageAsset(imageUrl.href);
      const tileWidth = tilesetRef.tilewidth || mapTileWidth;
      const tileHeight = tilesetRef.tileheight || mapTileHeight;
      const columns = tilesetRef.columns || Math.max(1, Math.floor(image.width / Math.max(tileWidth, 1)));
      const margin = tilesetRef.margin || 0;
      const spacing = tilesetRef.spacing || 0;
      return {
        firstgid: tilesetRef.firstgid || 1,
        tileWidth,
        tileHeight,
        columns,
        margin,
        spacing,
        image
      };
    }
    return null;
  }
  async function loadExternalDwarfTestTileset(tilesetRef, mapUrl, scenario, mapTileWidth, mapTileHeight) {
    const fallbackPath = resolveTilesetFallback(scenario, tilesetRef.source);
    const primaryUrl = new URL(tilesetRef.source, mapUrl);
    const fallbackUrl = fallbackPath ? new URL(fallbackPath, mapUrl) : null;
    const { text: tsxText, urlUsed } = await fetchTextWithFallback(primaryUrl.href, fallbackUrl ? fallbackUrl.href : null);
    const parsed = parseTilesetXml(tsxText);
    if (!parsed || !parsed.imageSource) {
      throw new Error(`Tileset "${tilesetRef.source}" is missing an image definition.`);
    }
    const resolvedImageUrl = new URL(parsed.imageSource, urlUsed);
    const image = await loadImageAsset(resolvedImageUrl.href);
    const tileWidth = parsed.tileWidth || mapTileWidth;
    const tileHeight = parsed.tileHeight || mapTileHeight;
    const usableWidth = image.width - parsed.margin * 2 + parsed.spacing;
    const columns = parsed.columns || Math.max(1, Math.floor(usableWidth / Math.max(tileWidth + parsed.spacing, 1)));
    return {
      firstgid: tilesetRef.firstgid || 1,
      tileWidth,
      tileHeight,
      columns,
      margin: parsed.margin,
      spacing: parsed.spacing,
      image
    };
  }
  async function fetchTextWithFallback(primaryUrl, fallbackUrl) {
    try {
      const response = await fetch(primaryUrl);
      if (response.ok) {
        return { text: await response.text(), urlUsed: primaryUrl };
      if (!fallbackUrl) {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      if (!fallbackUrl) {
        throw error;
      }
    }
    if (!fallbackUrl) {
      throw new Error(`Request to ${primaryUrl} failed and no fallback was provided.`);
    }
    const fallbackResponse = await fetch(fallbackUrl);
    if (!fallbackResponse.ok) {
      throw new Error(`Fallback request failed with status ${fallbackResponse.status}`);
    }
    return { text: await fallbackResponse.text(), urlUsed: fallbackUrl };
  }
  function normaliseTilesetPath(value) {
    return typeof value === "string" ? value.replace(/\\/g, "/").trim() : "";
  }
  function resolveTilesetFallback(scenario, source) {
    if (!scenario || !scenario.tilesetFallbacks) {
      return null;
    }
    const normalized = normaliseTilesetPath(source);
    const basenameIndex = normalized.lastIndexOf("/");
    const basename = basenameIndex >= 0 ? normalized.slice(basenameIndex + 1) : normalized;
    const fallbacks = scenario.tilesetFallbacks;
    if (fallbacks instanceof Map) {
      if (fallbacks.has(source)) {
        return fallbacks.get(source);
      }
      if (fallbacks.has(normalized)) {
        return fallbacks.get(normalized);
      }
      if (fallbacks.has(basename)) {
        return fallbacks.get(basename);
      }
      return null;
    }
    if (typeof fallbacks === "object") {
      return fallbacks[source] || fallbacks[normalized] || fallbacks[basename] || null;
    }
    return null;
  }
  function loadImageAsset(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Failed to load image at ${url}`));
      image.src = url;
  }
  function parseTilesetXml(xmlText) {
    if (typeof DOMParser === "undefined") {
      throw new Error("DOMParser is not available to parse tileset data.");
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "application/xml");
    if (doc.getElementsByTagName("parsererror").length > 0) {
      throw new Error("Unable to parse tileset XML.");
    }
    const tilesetElement = doc.querySelector("tileset");
    if (!tilesetElement) {
      throw new Error("Tileset XML is missing the <tileset> element.");
    }
    const imageElement = tilesetElement.querySelector("image");
    if (!imageElement) {
      throw new Error("Tileset XML is missing the <image> element.");
    }
    const tileWidth = Number.parseInt(tilesetElement.getAttribute("tilewidth") || "", 10) || 0;
    const tileHeight = Number.parseInt(tilesetElement.getAttribute("tileheight") || "", 10) || 0;
    const margin = Number.parseInt(tilesetElement.getAttribute("margin") || "0", 10) || 0;
    const spacing = Number.parseInt(tilesetElement.getAttribute("spacing") || "0", 10) || 0;
    const columnsAttr = tilesetElement.getAttribute("columns");
    const columns = columnsAttr ? Number.parseInt(columnsAttr, 10) : 0;
    return {
      tileWidth,
      tileHeight,
      margin,
      spacing,
      columns: Number.isFinite(columns) && columns > 0 ? columns : void 0,
      imageSource: imageElement.getAttribute("source") || ""
    };
  }
  function drawDwarfTestScenario(canvas, resources, scenario) {
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const map = resources == null ? void 0 : resources.map;
    if (!map || !map.width || !map.height) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const tileWidth = map.tilewidth || 16;
    const tileHeight = map.tileheight || 16;
    const width = map.width * tileWidth;
    const height = map.height * tileHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    context.clearRect(0, 0, width, height);
    const background = map.backgroundcolor || scenario.backgroundColor;
    if (background) {
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);
    }
    const layers = Array.isArray(map.layers) ? map.layers.filter((layer) => layer.type === "tilelayer" && layer.visible !== false && Array.isArray(layer.data)) : [];
    if (!layers.length) {
      return;
    }
    const tilesets = Array.isArray(resources.tilesets) ? resources.tilesets : [];
    const sortedTilesets = tilesets.slice().sort((a, b) => a.firstgid - b.firstgid);
    layers.forEach((layer) => {
      const { data } = layer;
      for (let index = 0; index < data.length; index += 1) {
        const gid = data[index];
        if (!gid) {
          continue;
        }
        const tileset = findTilesetForGid(sortedTilesets, gid);
        if (!tileset || !tileset.image) {
          continue;
        }
        const localId = gid - tileset.firstgid;
        if (localId < 0) {
          continue;
        }
        const columns = tileset.columns || 1;
        const sx = tileset.margin + localId % columns * (tileset.tileWidth + tileset.spacing);
        const sy = tileset.margin + Math.floor(localId / columns) * (tileset.tileHeight + tileset.spacing);
        const dx = index % map.width * tileWidth;
        const dy = Math.floor(index / map.width) * tileHeight;
        context.drawImage(
          tileset.image,
          sx,
          sy,
          tileset.tileWidth,
          tileset.tileHeight,
          dx,
          dy,
          tileWidth,
          tileHeight
        );
      }
    });
  }
  function findTilesetForGid(tilesets, gid) {
    for (let index = tilesets.length - 1; index >= 0; index -= 1) {
      const tileset = tilesets[index];
      if (gid >= tileset.firstgid) {
        return tileset;
      }
    }
    return null;
  }
  function handleDwarfTestResize() {
    if (!dwarfTestState.active || !elements.dwarfTestArea || !elements.dwarfTestCanvas) {
      return;
    }
    const canvas = elements.dwarfTestCanvas;
    const area = elements.dwarfTestArea;
    if (!canvas.width || !canvas.height) {
      canvas.style.transform = "";
      canvas.style.transformOrigin = "";
      return;
    }
    const availableWidth = area.clientWidth;
    const availableHeight = area.clientHeight;
    if (!availableWidth || !availableHeight) {
      canvas.style.transform = "";
      canvas.style.transformOrigin = "";
      return;
    }
    const scale = Math.min(availableWidth / canvas.width, availableHeight / canvas.height, 1);
    if (Number.isFinite(scale) && scale > 0 && scale < 0.999) {
      canvas.style.transform = `scale(${scale})`;
      canvas.style.transformOrigin = "top left";
      canvas.style.transform = "";
      canvas.style.transformOrigin = "";
  function getOptionByValue(category, value) {
    if (!category || !value || typeof category !== "string" || typeof value !== "string") {
      return null;
    }
    const options = dwarfOptions[category];
    if (!Array.isArray(options)) {
      return null;
    }
    return options.find((option) => option && option.value === value) || null;
  }
  function getOptionLabel(category, value) {
    if (!category || !value) {
      return value || "";
    }
    const option = getOptionByValue(category, value);
    if (option && typeof option.label === "string") {
      return option.label;
    }
    return value || "";
  }
  customizerDeps = {
    state,
    elements,
    getOptionByValue,
    getOptionLabel,
    getHairSummaryPhrase,
    getHairStyleConfig,
    resolveHairStyleValue,
    resolveHeadTypeValue,
    dwarfHeadTypes,
    dwarfSpriteSheets,
    characterCreatorPortraitAssets,
    characterCreatorBeardAssetMap,
    characterCreatorHairAssetMap,
    characterCreatorHairStyleCategoryMap,
    characterCreatorDefaultSkinColor,
    characterCreatorDefaultHairColor,
    getCharacterCreatorSkinTintLayers,
    getCharacterCreatorHairTintLayers,
    setActiveDwarf,
    getActiveDwarf
  };
  function extractFirstName(fullName) {
    if (!fullName || typeof fullName !== "string") {
      return "";
    }
    const trimmed = fullName.trim();
    const spaceIndex = trimmed.indexOf(" ");
    if (spaceIndex > 0) {
      return trimmed.substring(0, spaceIndex);
    }
    return trimmed;
  }
  function isPresetDwarfFirstName(name) {
    if (!name || typeof name !== "string") {
      return false;
    }
    return presetDwarfFirstNames.has(name.trim());
  }
  function generateDwarfFirstName(gender) {
    const genderKey = gender === "female" ? "female" : "male";
    const namePool = dwarfNamePools[genderKey] || dwarfNamePools.male;
    if (!Array.isArray(namePool) || namePool.length === 0) {
      return gender === "female" ? "Domas" : "Urist";
    }
    return pickRandomFrom(namePool, Math.random) || (gender === "female" ? "Domas" : "Urist");
  }
  function generateDwarfName(gender, clan) {
    const firstName = generateDwarfFirstName(gender);
    if (!clan) {
      return firstName;
    }
    const clanLabel = getOptionLabel("clan", clan);
    if (!clanLabel) {
      return firstName;
    }
    return `${firstName} ${clanLabel}`;
  }
  function createRandomDwarf() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const gender = Math.random() < 0.5 ? "male" : "female";
    const clan = Array.isArray(dwarfOptions.clan) && dwarfOptions.clan.length > 0 ? ((_a = pickRandomFrom(dwarfOptions.clan, Math.random)) == null ? void 0 : _a.value) || dwarfOptions.clan[0].value : null;
    const profession = Array.isArray(dwarfOptions.profession) && dwarfOptions.profession.length > 0 ? ((_b = pickRandomFrom(dwarfOptions.profession, Math.random)) == null ? void 0 : _b.value) || dwarfOptions.profession[0].value : null;
    const skin = Array.isArray(dwarfOptions.skin) && dwarfOptions.skin.length > 0 ? ((_c = pickRandomFrom(dwarfOptions.skin, Math.random)) == null ? void 0 : _c.value) || dwarfOptions.skin[0].value : "russet";
    const eyes = Array.isArray(dwarfOptions.eyes) && dwarfOptions.eyes.length > 0 ? ((_d = pickRandomFrom(dwarfOptions.eyes, Math.random)) == null ? void 0 : _d.value) || dwarfOptions.eyes[0].value : "amber";
    const hair = Array.isArray(dwarfOptions.hair) && dwarfOptions.hair.length > 0 ? ((_e = pickRandomFrom(dwarfOptions.hair, Math.random)) == null ? void 0 : _e.value) || dwarfOptions.hair[0].value : "umber";
    const hairStyle = Array.isArray(dwarfOptions.hairStyle) && dwarfOptions.hairStyle.length > 0 ? ((_f = pickRandomFrom(dwarfOptions.hairStyle, Math.random)) == null ? void 0 : _f.value) || defaultHairStyleValue : defaultHairStyleValue;
    const head = Array.isArray(dwarfOptions.head) && dwarfOptions.head.length > 0 ? ((_g = pickRandomFrom(dwarfOptions.head, Math.random)) == null ? void 0 : _g.value) || dwarfOptions.head[0].value : null;
    const beard = gender === "female" ? "clean" : Array.isArray(dwarfOptions.beard) && dwarfOptions.beard.length > 0 ? ((_h = pickRandomFrom(dwarfOptions.beard, Math.random)) == null ? void 0 : _h.value) || "clean" : "clean";
    return {
      name: generateDwarfName(gender, clan),
      gender,
      clan: clan || null,
      profession: profession || null,
      skin,
      eyes,
      hair,
      hairStyle,
      head: head || null,
      beard
    };
  }
  function ensureDwarfParty(options = {}) {
    const { forceReset = false } = options;
    if (!state.dwarfParty || forceReset) {
      state.dwarfParty = {
        dwarves: [],
        activeIndex: 0
      };
    }
    if (!Array.isArray(state.dwarfParty.dwarves)) {
      state.dwarfParty.dwarves = [];
    }
    if (typeof state.dwarfParty.activeIndex !== "number" || !Number.isFinite(state.dwarfParty.activeIndex)) {
      state.dwarfParty.activeIndex = 0;
    }
    if (state.dwarfParty.dwarves.length === 0) {
      state.dwarfParty.dwarves.push(createRandomDwarf());
    }
    state.dwarfParty.activeIndex = clamp(state.dwarfParty.activeIndex, 0, Math.max(0, state.dwarfParty.dwarves.length - 1));
  }
  var wizardTowerAmbienceTracks = [
    "sound/ambience/Cavern.ogg",
    "sound/ambience/Good.ogg"
  ];
  function loadImage(src) {
    const img = new Image();
    img.src = src;
    img.decoding = "async";
    if (img.decode) {
      return img.decode().then(() => img);
    }
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }
    const computeNearestDistanceSq2 = (x, y, points) => {
    const findNearestPointWithDetails2 = (x, y, points) => {
              const distanceToHoldSq = computeNearestDistanceSq2(candidate.x, candidate.y, dwarfholds);
              const distanceToHillholdSq = computeNearestDistanceSq2(candidate.x, candidate.y, hillholds);
            const nearestHoldInfo = findNearestPointWithDetails2(candidate.x, candidate.y, dwarfholds);
              const nearestHoldInfo = findNearestPointWithDetails2(candidate.x, candidate.y, dwarfholds);
          const holdDistanceSq = computeNearestDistanceSq2(x, y, dwarfholds);
          const nearestHoldDistanceSq = computeNearestDistanceSq2(candidate.x, candidate.y, dwarfholds);
          const nearestHoldInfo = findNearestPointWithDetails2(candidate.x, candidate.y, dwarfholds);
          const nearestHoldInfo = findNearestPointWithDetails2(x, y, dwarfholds);
            const settlementDistSq = computeNearestDistanceSq2(x, y, towns);
            const hamletDistSq = computeNearestDistanceSq2(x, y, hamletPoints);
            const distanceToExistingHamletSq = computeNearestDistanceSq2(
            const distanceToTownsSq = computeNearestDistanceSq2(candidate.x, candidate.y, towns);
          const settlementDistSq = computeNearestDistanceSq2(x, y, majorSettlementPoints);
          const settlementDistSq = computeNearestDistanceSq2(candidate.x, candidate.y, majorSettlementPoints);
            const settlementDistSq = computeNearestDistanceSq2(x, y, majorSettlementPoints);
            const distanceToOrcsSq = computeNearestDistanceSq2(x, y, hostileWarCamps);
          const nearestSettlement = findNearestPointWithDetails2(x, y, majorSettlementPoints);
          const distanceToOrcsSq = computeNearestDistanceSq2(x, y, hostileWarCamps);
          const distanceToCentaurSq = computeNearestDistanceSq2(x, y, centaurEncampments);
          const nearest = candidate.nearestSettlement || findNearestPointWithDetails2(candidate.x, candidate.y, majorSettlementPoints);
          const nearestCivil = findNearestPointWithDetails2(x, y, civilSettlements);
            const distanceToCampSq = computeNearestDistanceSq2(candidate.x, candidate.y, travelerCamps);
            const distanceToOrcSq = computeNearestDistanceSq2(candidate.x, candidate.y, hostileWarCamps);
            const distanceToCentaurSq = computeNearestDistanceSq2(candidate.x, candidate.y, centaurEncampments);
          const nearest = candidate.nearestCivil || findNearestPointWithDetails2(candidate.x, candidate.y, civilSettlements);
              const nearest = fallbackCandidate.nearestCivil || findNearestPointWithDetails2(fallbackCandidate.x, fallbackCandidate.y, civilSettlements);
          const settlementDistSq = computeNearestDistanceSq2(x, y, majorSettlementPoints);
          const distanceToTownSq = computeNearestDistanceSq2(x, y, towns);
          const distanceToHoldSq = computeNearestDistanceSq2(x, y, dwarvenSettlements);
          const distanceToOrcsSq = computeNearestDistanceSq2(x, y, hostileWarCamps);
          const distanceToCentaurSq = computeNearestDistanceSq2(x, y, centaurEncampments);
          const distanceToTownSq = computeNearestDistanceSq2(x, y, towns);
          const distanceToHoldSq = computeNearestDistanceSq2(x, y, dwarvenSettlements);
          const distanceToMonasterySq = computeNearestDistanceSq2(x, y, monasteryPoints);
          const distanceToSettlementSq = computeNearestDistanceSq2(x, y, majorSettlementPoints);
    runWithLoadingScreen(() => generateAndRender(), { statusText: "Forging your world\u2026" }).then(() => {
  async function loadTileSheetImages() {
    const sheetKeys = Object.keys(state.tileSheets || {});
    const loadPromises = [];
    for (let i = 0; i < sheetKeys.length; i += 1) {
      const key = sheetKeys[i];
      const sheet = state.tileSheets[key];
      if (!sheet || !sheet.path) {
        continue;
      }
      if (sheet.image) {
        continue;
      }
      try {
        const imagePromise = loadImage(sheet.path);
        imagePromise.then((img) => {
          if (sheet && img) {
            sheet.image = img;
          }
        }).catch((error) => {
          console.warn(`Failed to load tile sheet image: ${sheet.path}`, error);
        });
        loadPromises.push(imagePromise);
      } catch (error) {
        console.warn(`Error loading tile sheet: ${key}`, error);
      }
    }
    if (loadPromises.length > 0) {
      await Promise.all(loadPromises);
    }
  }
    await updateLoadingProgressAndWait(5, "Loading tile sheets\xE2\u20AC\xA6");
    await loadTileSheetImages();
      { statusText: "Forging a new world\u2026" }
