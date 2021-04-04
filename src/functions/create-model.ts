import { ADVERSARIES } from "@data/adversaries";
import { BOARDS } from "@data/boards";
import { MAPS } from "@data/maps";
import { SCENARIOS } from "@data/scenarios";
import { SPIRITS } from "@data/spirits";
import type { AdversaryLevelId, AdversaryName } from "@models/game/adversaries";
import type { BalancedBoardName } from "@models/game/board";
import type { ExpansionName, IExpansionOption } from "@models/game/expansions";
import type { MapName } from "@models/game/maps";
import type { ScenarioName } from "@models/game/scenarios";
import type { SpiritName } from "@models/game/spirits";
import { getOptionsByExpansion } from "./get-options";

export function createSpiritsModel(expansions: ExpansionName[] = []): SpiritName[] {
	return createModel(SPIRITS, expansions);
}

export function createMapsModel(expansions: ExpansionName[] = []): MapName[] {
	return createModel(MAPS, expansions);
}

export function createBoardsModel(expansions: ExpansionName[] = []): BalancedBoardName[] {
	return createModel(BOARDS, expansions);
}

export function createScenariosModel(expansions: ExpansionName[] = []): ScenarioName[] {
	return createModel(SCENARIOS, expansions);
}

export function createAdversariesModel(expansions: ExpansionName[] = []): (AdversaryName | AdversaryLevelId)[] {
	return getOptionsByExpansion(ADVERSARIES, expansions).reduce((adversaries, adversary) => {
		adversaries.push(adversary.name);
		adversary.levels.forEach(level => {
			adversaries.push(level.id);
		});
		return adversaries;
	}, [] as (AdversaryName | AdversaryLevelId)[])
}

export function recreateModel<TName>(
	createModel: (expansions?: ExpansionName[]) => TName[],
	existingModel: TName[],
	expansions: ExpansionName[],
): TName[] {
	const expansionItemNames = getExpansionItemNames(createModel, expansions);
	const allowedItemNames = createModel(expansions);
	return [
		...existingModel.filter(name => allowedItemNames.includes(name)),
		...expansionItemNames
	];
}

export function augmentModel<TName>(
	createModel: (expansions?: ExpansionName[]) => TName[],
	existingModel: TName[],
	expansionsToAdd: ExpansionName[],
): TName[] {
	const expansionItemNames = getExpansionItemNames(createModel, expansionsToAdd);
	return [
		...existingModel,
		...expansionItemNames,
	];
}

export function purgeModel<TName>(
	createModel: (expansions?: ExpansionName[]) => TName[],
	existingModel: TName[],
	expansionsToRemove: ExpansionName[],
): TName[] {
	const expansionItemNames = getExpansionItemNames(createModel, expansionsToRemove);
	return existingModel.filter(name => !expansionItemNames.includes(name));
}

function getExpansionItemNames<TName>(
	createModel: (expansions?: ExpansionName[]) => TName[],
	expansions: ExpansionName[]
): TName[] {
	const baseItemNames = createModel();
	return createModel(expansions).filter(name => !baseItemNames.includes(name));
}

interface IGenericExpansionOption<TName extends string> extends IExpansionOption {
	name: TName;
}

function createModel<TName extends string>(
	options: IGenericExpansionOption<TName>[],
	expansions: ExpansionName[]
): TName[] {
	return getOptionsByExpansion(options, expansions).map(option => option.name);
}