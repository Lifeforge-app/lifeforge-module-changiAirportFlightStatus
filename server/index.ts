import z from 'zod'

import {
  createForge,
  forgeRouter,
  writeContractFileToClient
} from '@lifeforge/server-utils'

const forge = createForge({})

const cache = new Map()

const cacheTime = 1000 * 60

let lastFetch = +new Date()

const FlightSchema = z.object({
  actual_timestamp: z.null(),
  aircraft_type: z.string(),
  airline: z.string(),
  airline_details: z.object({
    logo_url: z.string(),
    code: z.string(),
    name: z.string(),
    name_zh: z.string(),
    name_zh_hant: z.string().nullable(),
    transfer_counters: z.string().nullable(),
    transit: z.string()
  }),
  airport: z.string(),
  airport_details: z.object({
    code: z.string(),
    country_code: z.string(),
    lat: z.string(),
    lng: z.string(),
    name: z.string(),
    name_zh: z.string(),
    name_zh_hant: z.string()
  }),
  check_in_row: z.string().nullable(),
  current_gate: z.string().nullable(),
  direction: z.string(),
  display_belt: z.null(),
  display_checkinrowctr: z.string().nullable(),
  display_gate: z.string().nullable(),
  display_timestamp: z.string(),
  drop_off_door: z.string().nullable(),
  estimated_timestamp: z.string().nullable(),
  flight_number: z.string(),
  firstbag_timestamp: z.null(),
  flight_status: z.string(),
  flight_type: z.string(),
  last_updated_timestamp: z.string(),
  lastbag_timestamp: z.null(),
  master_flight_number: z.string().nullable(),
  nature: z.string(),
  nearest_carpark: z.string().nullable(),
  offblock_timestamp: z.string().nullable(),
  origin_dep_country: z.null(),
  origin_dep_date: z.null(),
  origin_dep_terminal: z.null(),
  origin_dep_time: z.null(),
  origin_via_country: z.null(),
  pick_up_door: z.null(),
  previous_gate: z.string().nullable(),
  scheduled_date: z.string(),
  scheduled_time: z.string(),
  slave_flights: z.array(z.string()),
  technical_flight_status1: z.string(),
  technical_flight_status2: z.string(),
  terminal: z.string(),
  via: z.string().nullable(),
  via_airport_details: z
    .object({
      code: z.string(),
      country_code: z.string(),
      lat: z.string(),
      lng: z.string(),
      name: z.string(),
      name_zh: z.string(),
      name_zh_hant: z.string()
    })
    .nullable(),
  status_mapping: z.object({
    belt_status_en: z.null(),
    belt_status_zh: z.null(),
    details_status_en: z.string(),
    details_status_zh: z.string(),
    listing_status_en: z.string(),
    listing_status_zh: z.string(),
    show_gate: z.boolean(),
    status_text_color: z.string()
  })
})

const GetFlightsSchema = z.object({
  getFlights: z.object({
    next_token: z.string(),
    flights: z.array(FlightSchema)
  })
})

const getFlight = forge
  .query({
    description: 'Get Changi Airport flight status for arrivals or departures',
    input: {
      query: z.object({
        type: z.enum(['arr', 'dep'])
      })
    },
    output: {
      OK: GetFlightsSchema
    }
  })
  .callback(async ({ query: { type }, response }) => {
    if (
      cache.has('flights') &&
      cache.get('searchType') === type &&
      +new Date() - lastFetch < cacheTime
    ) {
      const data = cache.get('flights')

      return response.ok(data as z.infer<typeof GetFlightsSchema>)
    }

    const API_key = await fetch(
      'https://www.changiairport.com/en/flights/arrivals.html'
    )
      .then(res => res.text())
      .then(
        data => data.match(/&#34;appSyncApiKey&#34;: &#34;(.*?)&#34;,/)?.[1]
      )
      .catch(console.error)

    const { data } = await fetch(
      'https://ca-appsync.lz.changiairport.com/graphql',
      {
        method: 'POST',
        headers: {
          'x-api-key': API_key ?? ''
        },
        body: JSON.stringify({
          query: `
    query {
      getFlights(direction: "${type}", page_size: "500") {
        next_token
        flights {
          actual_timestamp
          aircraft_type
          airline
          airline_details {
            logo_url
            code
            name
            name_zh
            name_zh_hant
            transfer_counters
            transit
          }
          airport
          airport_details {
            code
            country_code
            lat
            lng
            name
            name_zh
            name_zh_hant
          }
          check_in_row
          current_gate
          direction
          display_belt
          display_checkinrowctr
          display_gate
          display_timestamp
          drop_off_door
          estimated_timestamp
          flight_number
          firstbag_timestamp
          flight_status
          flight_type
          last_updated_timestamp
          lastbag_timestamp
          master_flight_number
          nature
          nearest_carpark
          offblock_timestamp
          origin_dep_country
          origin_dep_date
          origin_dep_terminal
          origin_dep_time
          origin_via_country
          pick_up_door
          previous_gate
          scheduled_date
          scheduled_time
          slave_flights
          technical_flight_status1
          technical_flight_status2
          terminal
          via
          via_airport_details {
            code
            country_code
            lng
            lat
            name
            name_zh
            name_zh_hant
          }
          status_mapping {
            belt_status_en
            belt_status_zh
            details_status_en
            details_status_zh
            listing_status_en
            listing_status_zh
            show_gate
            status_text_color
          }
        }
      }
    }
                `
        })
      }
    ).then(res => res.json())

    cache.set('flights', data)
    cache.set('searchType', type)
    lastFetch = +new Date()

    return response.ok(data as z.infer<typeof GetFlightsSchema>)
  })

const routes = forgeRouter({
  getFlight
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
