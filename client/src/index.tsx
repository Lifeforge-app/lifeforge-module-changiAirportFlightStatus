import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import {
  Flex,
  Icon,
  Listbox,
  ListboxOption,
  ModuleHeader,
  Scrollbar,
  SearchInput,
  TagChip,
  Text,
  WithQuery
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import * as styles from './index.css'

const STATUSES: Record<string, { color: string; icon: string }> = {
  Departed: { color: '#22c55e', icon: 'tabler:plane-departure' },
  Boarding: { color: '#3b82f6', icon: 'tabler:users' },
  'Gate Closed': { color: '#ef4444', icon: 'tabler:door-off' },
  'Gate Closing': { color: '#f97316', icon: 'tabler:door' },
  'Gate Open': { color: '#eab308', icon: 'tabler:door-enter' },
  'New Gate': { color: '#84cc16', icon: 'tabler:transfer' },
  'Re-timed': { color: '#d946ef', icon: 'tabler:clock' },
  Scheduled: { color: '#6366f1', icon: 'tabler:calendar-event' },
  'Last Call': { color: '#ec4899', icon: 'tabler:bell' },
  Cancelled: { color: '#ef4444', icon: 'tabler:ban' },
  Landed: { color: '#3b82f6', icon: 'tabler:plane-arrival' },
  Confirmed: { color: '#22c55e', icon: 'tabler:check' },
  Delayed: { color: '#ef4444', icon: 'tabler:clock-stop' }
}

const SEARCH_TYPE = [
  ['Departures', 'tabler:plane-departure', 'dep'],
  ['Arrivals', 'tabler:plane-arrival', 'arr']
]

function ChangiAirportFlightStatus() {
  const [type, setType] = useState<'dep' | 'arr'>('dep')
  const [searchQuery, setSearchQuery] = useState('')

  const flightsQuery = useQuery(
    forgeAPI.getFlight.input({ type }).queryOptions()
  )

  return (
    <>
      <ModuleHeader />
      <Flex
        align="center"
        direction={{ base: 'column', sm: 'row' }}
        gap="sm"
        mb="lg"
      >
        <Listbox
          minWidth="14rem"
          renderContent={() => (
            <Flex align="center" gap="xs">
              <Icon
                icon={
                  SEARCH_TYPE.find(([, , t]) => t === type)?.[1] ||
                  'tabler:plane-departure'
                }
                size="1.5rem"
              />
              <Text weight="medium" whiteSpace="nowrap">
                {SEARCH_TYPE.find(([, , t]) => t === type)?.[0] || 'Departure'}
              </Text>
            </Flex>
          )}
          value={type}
          width={{ base: '100%', sm: 'min-content' }}
          onChange={value => {
            setType(value)
          }}
        >
          {SEARCH_TYPE.map(([name, icon, value]) => (
            <ListboxOption key={value} icon={icon} label={name} value={value} />
          ))}
        </Listbox>
        <SearchInput
          searchTarget="flight"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </Flex>
      <Scrollbar style={{ flex: 1, width: '100%' }}>
        <WithQuery query={flightsQuery}>
          {flights => (
            <table className={styles.table}>
              <thead>
                <tr className={styles.headerRow}>
                  {[
                    'Status',
                    'Scheduled Time',
                    'Flight Number',
                    'Aircraft Type',
                    'Airline',
                    `${type === 'dep' ? 'Destination' : 'Origin'} Airport`,
                    'Terminal',
                    'Gate',
                    type === 'dep' ? 'Check-In Row' : 'Baggage Belt',
                    'Estimated Time',
                    'Code Share'
                  ].map(column => (
                    <th key={column} className={styles.headerCell}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flights.getFlights.flights.map(flight => {
                  const status = STATUSES[flight.flight_status]

                  return (
                    <tr
                      key={flight.flight_number + flight.scheduled_time}
                      className={styles.row}
                    >
                      <td className={styles.cell}>
                        <TagChip
                          as="span"
                          color={status?.color}
                          icon={status?.icon}
                          label={flight.flight_status}
                        />
                      </td>
                      <td className={styles.cell}>{flight.scheduled_time}</td>
                      <td className={styles.cell}>{flight.flight_number}</td>
                      <td className={styles.cell}>
                        <Flex align="center" gap="xs">
                          {'AB'.includes(flight.aircraft_type[0]) ? (
                            <Icon
                              icon={
                                flight.aircraft_type[0] === 'B'
                                  ? 'simple-icons:boeing'
                                  : 'simple-icons:airbus'
                              }
                            />
                          ) : (
                            ''
                          )}
                          {flight.aircraft_type}
                        </Flex>
                      </td>
                      <td className={styles.cellLeft}>
                        <Flex align="center" gap="xs">
                          <img
                            alt={flight.airline_details.name}
                            src={flight.airline_details.logo_url}
                            style={{ height: '1.5rem', width: '1.5rem' }}
                          />
                          {flight.airline_details.name} ({flight.airline})
                        </Flex>
                      </td>
                      <td className={styles.cell}>
                        {flight.airport_details.name} ({flight.airport})
                      </td>
                      <td className={styles.cell}>T{flight.terminal}</td>
                      <td className={styles.cell}>
                        {type === 'dep'
                          ? flight.current_gate
                          : flight.display_gate}
                      </td>
                      <td className={styles.cell}>
                        {type === 'dep'
                          ? flight.check_in_row
                          : flight.display_belt}
                      </td>
                      <td className={styles.cell}>
                        {flight.estimated_timestamp}
                      </td>
                      <td className={styles.cellLeft}>
                        {flight.slave_flights.join(', ')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </WithQuery>
      </Scrollbar>
    </>
  )
}

export default ChangiAirportFlightStatus
