import { style } from '@vanilla-extract/css'

import { COLORS } from '@lifeforge/ui'

export const table = style({
  marginRight: '2rem',
  marginBottom: '2rem',
  width: 'max-content'
})

export const headerRow = style({
  color: COLORS['bg-500'],
  borderBottom: `2px solid ${COLORS['bg-200']}`,
  selectors: {
    '.dark &': {
      borderBottomColor: COLORS['bg-800']
    }
  }
})

export const headerCell = style({
  padding: '0.5rem',
  fontWeight: 500
})

export const row = style({
  borderBottom: `1px solid ${COLORS['bg-200']}`,
  selectors: {
    '.dark &': {
      borderBottomColor: COLORS['bg-800']
    }
  }
})

export const cell = style({
  padding: '0.5rem',
  textAlign: 'center',
  whiteSpace: 'nowrap'
})

export const cellLeft = style({
  padding: '0.5rem',
  textAlign: 'left',
  whiteSpace: 'nowrap'
})
