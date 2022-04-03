import { test, expect } from '@jest/globals';
import Validator from '..';

const v = new Validator();

test('String validator', () => {
  const schema = v.string();

  expect(schema.isValid('')).toBeTruthy();

  schema.required();

  expect(schema.isValid('')).toBeFalsy();
  expect(schema.isValid('little')).toBeTruthy();

  expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
  expect(schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();

  expect(schema.isValid('what whatthe')).toBeTruthy();
});

test('Number validator', () => {
  const schema = v.number();

  expect(schema.isValid(null)).toBeTruthy();

  schema.required();

  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid('34')).toBeFalsy();

  expect(schema.isValid(23)).toBeTruthy();

  expect(schema.isValid(23)).toBeTruthy();

  schema.positive();

  expect(schema.isValid(-1)).toBeFalsy();
  expect(schema.isValid(0)).toBeFalsy();
  expect(schema.isValid(1)).toBeTruthy();

  schema.range(-5, 5);

  expect(schema.isValid(-1)).toBeFalsy();
  expect(schema.isValid(5)).toBeTruthy();
  expect(schema.isValid(6)).toBeFalsy();
});

test('Array validator', () => {
  const schema = v.array();

  expect(schema.isValid(null)).toBeTruthy();

  schema.required();

  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid([])).toBeTruthy();
  expect(schema.isValid(['hexlet'])).toBeTruthy();

  schema.sizeof(2);

  expect(schema.isValid(['hexlet'])).toBeFalsy();
  expect(schema.isValid(['hexlet', 'code-basics'])).toBeTruthy();
});

test('Object validator', () => {
  const schema = v.object();

  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });

  expect(schema.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
  expect(schema.isValid({ name: 'maya', age: null })).toBeTruthy();
  expect(schema.isValid({ name: '', age: null })).toBeFalsy();
  expect(schema.isValid({ name: 'ada', age: -5 })).toBeFalsy();
});

test('Add validator', () => {
  const startWith = (value, start) => value.startsWith(start);
  v.addValidator('string', 'startWith', startWith);

  const stringSchema = v.string().test('startWith', 'H');

  expect(stringSchema.isValid('exlet')).toBeFalsy();
  expect(stringSchema.isValid('Hexlet')).toBeTruthy();

  const min = (value, minValue) => value >= minValue;
  v.addValidator('number', 'min', min);

  const numberSchema = v.number().test('min', 5);

  expect(numberSchema.isValid(4)).toBeFalsy();
  expect(numberSchema.isValid(6)).toBeTruthy();

  expect(() => v.addValidator('date', 'early', Date.now())).toThrow();
});
