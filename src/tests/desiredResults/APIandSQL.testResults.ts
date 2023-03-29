import { expect } from '@jest/globals';

const result1 = [
  {
    id: expect.anything(),
    name: 'Black DOOM® T-shirt',
    description: 'Cool T-shirt with DOOM logo.',
    categories: [
      {
        id: expect.anything(),
        name: 'Gaming apparel',
      },
    ],
    variations: [
      {
        id: expect.anything(),
        currency: 'EURO',
        size: 'S',
        price: 25,
      },
      {
        id: expect.anything(),
        currency: 'EURO',
        size: 'M',
        price: 25,
      },
      {
        id: expect.anything(),
        currency: 'EURO',
        size: 'L',
        price: 25,
      },
    ],
  },
  {
    id: expect.anything(),
    name: 'World of Warcraft Outland map wall poster',
    description:
      'A high quality map of the Outlands from World of Warcraft The Burning Crusade expansion. An excellent gift for someone who is a fan of World of Warcraft and The Burning Crusade expansion specifically.',
    categories: [{ id: expect.anything(), name: 'Posters' }],
    variations: [
      {
        id: expect.anything(),
        currency: 'EURO',
        'paper size': 'A1',
        price: 19.9,
      },
      {
        id: expect.anything(),
        currency: 'EURO',
        'paper size': 'A2',
        price: 16.9,
      },
    ],
  },
  {
    id: expect.anything(),
    name: 'Minecraft coffee mug',
    description: 'Green coffee mug with Minecraft logo.',
    categories: [
      {
        id: expect.anything(),
        name: 'Coffee mugs',
      },
      { id: expect.anything(), name: 'Minecraft' },
    ],
    variations: [
      {
        id: expect.anything(),
        currency: 'EURO',
        price: 14.9,
      },
    ],
  },
];

const updatedResult2 = [
  {
    id: expect.anything(),
    name: '--',
    description: '--',
    categories: [
      {
        id: expect.anything(),
        name: 'Gaming --rel',
      },
    ],
    variations: [
      {
        id: expect.anything(),
        currency: 'EURO',
        size: '-',
        price: 25,
      },
      {
        id: expect.anything(),
        currency: 'EURO',
        size: '--',
        price: 25,
      },
    ],
  },
  {
    id: expect.anything(),
    name: 'World of Warcraft Outland map wall poster',
    description:
      'A high quality map of the Outlands from World of Warcraft The Burning Crusade expansion. An excellent gift for someone who is a fan of World of Warcraft and The Burning Crusade expansion specifically.',
    categories: [{ id: expect.anything(), name: 'Posters' }],
    variations: [
      {
        id: expect.anything(),
        currency: 'EURO',
        'paper size': 'A2',
        price: 16.9,
      },
      {
        id: expect.anything(),
        currency: 'EURO',
        'paper size': 'A12',
        price: 19.9,
      },
    ],
  },
  {
    id: expect.anything(),
    name: 'Minecraft coffee mug',
    description: 'Green coffee mug with Minecraft logo.',
    categories: [{ id: expect.anything(), name: 'Minecraft' }],
    variations: [
      {
        id: expect.anything(),
        currency: 'EURO',
        price: 14.9,
      },
    ],
  },
];

export { result1, updatedResult2 };
