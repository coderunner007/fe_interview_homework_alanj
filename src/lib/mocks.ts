import type { DateRange, Task, TaskStatus } from './stores';

export const oneContiguousRange: Array<Task> = Object.values({
	'20588615': {
		id: 20588615,
		name: 'asdfasf',
		startDate: '2024-02-20T00:00:00.000Z',
		endDate: '2024-02-21T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 4.2320647096157735,
	},
	'20588617': {
		id: 20588617,
		name: 'Test 3',
		startDate: '2024-02-03T00:00:00.000Z',
		endDate: '2024-02-08T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.573155553260602,
	},
	'20588618': {
		id: 20588618,
		name: 'Test 5',
		startDate: '2024-02-07T00:00:00.000Z',
		endDate: '2024-02-14T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.825708801974571,
	},
	'20588619': {
		id: 20588619,
		name: 'Test 6',
		startDate: '2024-02-04T00:00:00.000Z',
		endDate: '2024-02-10T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.7420598369885636,
	},
	'20588620': {
		id: 20588620,
		name: 'Test 7',
		startDate: '2024-02-13T00:00:00.000Z',
		endDate: '2024-02-13T00:00:00.000Z',
		status: 'done',
		color: 30,
		weight: 1.470458410309963,
	},
	'20588621': {
		id: 20588621,
		name: 'Testh',
		startDate: '2024-02-12T00:00:00.000Z',
		endDate: '2024-02-12T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.254464396164571,
	},
	'20588622': {
		id: 20588622,
		name: 'Test 8',
		startDate: '2024-02-14T00:00:00.000Z',
		endDate: '2024-02-14T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.6080240161665,
	},
	'20588623': {
		id: 20588623,
		name: 'Test 0',
		startDate: '2024-02-14T00:00:00.000Z',
		endDate: '2024-02-17T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.7168664090705352,
	},
	'20588634': {
		id: 20588634,
		name: 'Test m2',
		startDate: '2024-02-21T00:00:00.000Z',
		endDate: '2024-02-24T00:00:00.000Z',
		status: 'in_progress',
		color: 30,
		weight: 3.6714771381301903,
	},
	'20588637': {
		id: 20588637,
		name: 'Test 0',
		startDate: '2024-02-17T00:00:00.000Z',
		endDate: '2024-02-20T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.4059114995282727,
	},
}).map((x) => ({
	...x,
	startDate: new Date(x.startDate),
	endDate: new Date(x.endDate),
	status: x.status as TaskStatus,
}));

export const multipleContiguousDateRanges: Array<Task> = Object.values({
	'20588615': {
		id: 20588615,
		name: 'asdfasf',
		startDate: '2024-02-20T00:00:00.000Z',
		endDate: '2024-02-21T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 4.2320647096157735,
	},
	'20588617': {
		id: 20588617,
		name: 'Test 3',
		startDate: '2024-02-03T00:00:00.000Z',
		endDate: '2024-02-08T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.573155553260602,
	},
	'20588618': {
		id: 20588618,
		name: 'Test 5',
		startDate: '2024-02-04T00:00:00.000Z',
		endDate: '2024-02-11T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.7727604814154745,
	},
	'20588619': {
		id: 20588619,
		name: 'Test 6',
		startDate: '2024-02-04T00:00:00.000Z',
		endDate: '2024-02-10T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.7420598369885636,
	},
	'20588620': {
		id: 20588620,
		name: 'Test 7',
		startDate: '2024-02-13T00:00:00.000Z',
		endDate: '2024-02-13T00:00:00.000Z',
		status: 'done',
		color: 30,
		weight: 2.1622817236988983,
	},
	'20588621': {
		id: 20588621,
		name: 'Testh',
		startDate: '2024-02-12T00:00:00.000Z',
		endDate: '2024-02-12T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.2290119840738616,
	},
	'20588622': {
		id: 20588622,
		name: 'Test 8',
		startDate: '2024-02-25T00:00:00.000Z',
		endDate: '2024-02-25T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.573671812054479,
	},
	'20588623': {
		id: 20588623,
		name: 'Test 0',
		startDate: '2024-02-15T00:00:00.000Z',
		endDate: '2024-02-18T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 4.143968263251701,
	},
	'20588634': {
		id: 20588634,
		name: 'Test m2',
		startDate: '2024-02-21T00:00:00.000Z',
		endDate: '2024-02-24T00:00:00.000Z',
		status: 'in_progress',
		color: 30,
		weight: 3.6714771381301903,
	},
	'20588635': {
		id: 20588635,
		name: 'Test mr2',
		startDate: '2024-02-14T00:00:00.000Z',
		endDate: '2024-02-14T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.0058999599953575,
	},
	'20588637': {
		id: 20588637,
		name: 'Test 0',
		startDate: '2024-02-17T00:00:00.000Z',
		endDate: '2024-02-20T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 4.728357028974228,
	},
}).map((x) => ({
	...x,
	startDate: new Date(x.startDate),
	endDate: new Date(x.endDate),
	status: x.status as TaskStatus,
}));

export const noOverlappingRanges: Array<Task> = Object.values({
	'20588617': {
		id: 20588617,
		name: 'Test 3',
		startDate: '2024-02-03T00:00:00.000Z',
		endDate: '2024-02-08T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.573155553260602,
	},
	'20588620': {
		id: 20588620,
		name: 'Test 7',
		startDate: '2024-02-13T00:00:00.000Z',
		endDate: '2024-02-13T00:00:00.000Z',
		status: 'done',
		color: 30,
		weight: 2.1622817236988983,
	},
	'20588621': {
		id: 20588621,
		name: 'Testh',
		startDate: '2024-02-12T00:00:00.000Z',
		endDate: '2024-02-12T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.2290119840738616,
	},
	'20588622': {
		id: 20588622,
		name: 'Test 8',
		startDate: '2024-02-25T00:00:00.000Z',
		endDate: '2024-02-25T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.573671812054479,
	},
	'20588623': {
		id: 20588623,
		name: 'Test 0',
		startDate: '2024-02-14T00:00:00.000Z',
		endDate: '2024-02-17T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 3.786934698420798,
	},
	'20588635': {
		id: 20588635,
		name: 'Test mr2',
		startDate: '2024-02-10T00:00:00.000Z',
		endDate: '2024-02-10T00:00:00.000Z',
		status: 'to-do',
		color: 30,
		weight: 1.9252814769906978,
	},
}).map((x) => ({
	...x,
	startDate: new Date(x.startDate),
	endDate: new Date(x.endDate),
	status: x.status as TaskStatus,
}));

export const expectedNonOverlappingRanges: Array<DateRange> = [
	{
		since: new Date(2024, 1, 3),
		until: new Date(2024, 1, 24),
	},
];

export const expectedMultipleContiguousDateRanges: Array<DateRange> = [
	{
		since: new Date('2024-02-03T00:00:00.000Z'),
		until: new Date('2024-02-11T00:00:00.000Z'),
	},
	{
		since: new Date('2024-02-12T00:00:00.000Z'),
		until: new Date('2024-02-12T00:00:00.000Z'),
	},
	{
		since: new Date('2024-02-13T00:00:00.000Z'),
		until: new Date('2024-02-13T00:00:00.000Z'),
	},
	{
		since: new Date('2024-02-14T00:00:00.000Z'),
		until: new Date('2024-02-14T00:00:00.000Z'),
	},
	{
		since: new Date('2024-02-15T00:00:00.000Z'),
		until: new Date('2024-02-24T00:00:00.000Z'),
	},
	{
		since: new Date('2024-02-25T00:00:00.000Z'),
		until: new Date('2024-02-25T00:00:00.000Z'),
	},
].map((dr) => ({
	since: new Date(dr.since),
	until: new Date(dr.until),
}));

export const expectedNoOverlappingRanges: Array<DateRange> = [
	{
		since: '2024-02-03T00:00:00.000Z',
		until: '2024-02-08T00:00:00.000Z',
	},
	{
		since: '2024-02-10T00:00:00.000Z',
		until: '2024-02-10T00:00:00.000Z',
	},
	{
		since: '2024-02-12T00:00:00.000Z',
		until: '2024-02-12T00:00:00.000Z',
	},
	{
		since: '2024-02-13T00:00:00.000Z',
		until: '2024-02-13T00:00:00.000Z',
	},
	{
		since: '2024-02-14T00:00:00.000Z',
		until: '2024-02-17T00:00:00.000Z',
	},
	{
		since: '2024-02-25T00:00:00.000Z',
		until: '2024-02-25T00:00:00.000Z',
	},
].map((dr) => ({
	since: new Date(dr.since),
	until: new Date(dr.until),
}));
