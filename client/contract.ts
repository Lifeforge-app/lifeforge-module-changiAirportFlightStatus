export const contract = {
  "getFlight": {
    "method": "get",
    "description": "Get Changi Airport flight status for arrivals or departures",
    "noAuth": false,
    "encrypted": true,
    "isDownloadable": false,
    "media": null,
    "input": {
      "query": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "arr",
              "dep"
            ]
          }
        },
        "required": [
          "type"
        ],
        "additionalProperties": false
      }
    },
    "output": {
      "OK": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
          "getFlights": {
            "type": "object",
            "properties": {
              "next_token": {
                "type": "string"
              },
              "flights": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "actual_timestamp": {
                      "type": "null"
                    },
                    "aircraft_type": {
                      "type": "string"
                    },
                    "airline": {
                      "type": "string"
                    },
                    "airline_details": {
                      "type": "object",
                      "properties": {
                        "logo_url": {
                          "type": "string"
                        },
                        "code": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "name_zh": {
                          "type": "string"
                        },
                        "name_zh_hant": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "transfer_counters": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "transit": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "logo_url",
                        "code",
                        "name",
                        "name_zh",
                        "name_zh_hant",
                        "transfer_counters",
                        "transit"
                      ],
                      "additionalProperties": false
                    },
                    "airport": {
                      "type": "string"
                    },
                    "airport_details": {
                      "type": "object",
                      "properties": {
                        "code": {
                          "type": "string"
                        },
                        "country_code": {
                          "type": "string"
                        },
                        "lat": {
                          "type": "string"
                        },
                        "lng": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "name_zh": {
                          "type": "string"
                        },
                        "name_zh_hant": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "code",
                        "country_code",
                        "lat",
                        "lng",
                        "name",
                        "name_zh",
                        "name_zh_hant"
                      ],
                      "additionalProperties": false
                    },
                    "check_in_row": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "current_gate": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "direction": {
                      "type": "string"
                    },
                    "display_belt": {
                      "type": "null"
                    },
                    "display_checkinrowctr": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "display_gate": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "display_timestamp": {
                      "type": "string"
                    },
                    "drop_off_door": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "estimated_timestamp": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "flight_number": {
                      "type": "string"
                    },
                    "firstbag_timestamp": {
                      "type": "null"
                    },
                    "flight_status": {
                      "type": "string"
                    },
                    "flight_type": {
                      "type": "string"
                    },
                    "last_updated_timestamp": {
                      "type": "string"
                    },
                    "lastbag_timestamp": {
                      "type": "null"
                    },
                    "master_flight_number": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "nature": {
                      "type": "string"
                    },
                    "nearest_carpark": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "offblock_timestamp": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "origin_dep_country": {
                      "type": "null"
                    },
                    "origin_dep_date": {
                      "type": "null"
                    },
                    "origin_dep_terminal": {
                      "type": "null"
                    },
                    "origin_dep_time": {
                      "type": "null"
                    },
                    "origin_via_country": {
                      "type": "null"
                    },
                    "pick_up_door": {
                      "type": "null"
                    },
                    "previous_gate": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "scheduled_date": {
                      "type": "string"
                    },
                    "scheduled_time": {
                      "type": "string"
                    },
                    "slave_flights": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "technical_flight_status1": {
                      "type": "string"
                    },
                    "technical_flight_status2": {
                      "type": "string"
                    },
                    "terminal": {
                      "type": "string"
                    },
                    "via": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "via_airport_details": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "code": {
                              "type": "string"
                            },
                            "country_code": {
                              "type": "string"
                            },
                            "lat": {
                              "type": "string"
                            },
                            "lng": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            },
                            "name_zh": {
                              "type": "string"
                            },
                            "name_zh_hant": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "code",
                            "country_code",
                            "lat",
                            "lng",
                            "name",
                            "name_zh",
                            "name_zh_hant"
                          ],
                          "additionalProperties": false
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "status_mapping": {
                      "type": "object",
                      "properties": {
                        "belt_status_en": {
                          "type": "null"
                        },
                        "belt_status_zh": {
                          "type": "null"
                        },
                        "details_status_en": {
                          "type": "string"
                        },
                        "details_status_zh": {
                          "type": "string"
                        },
                        "listing_status_en": {
                          "type": "string"
                        },
                        "listing_status_zh": {
                          "type": "string"
                        },
                        "show_gate": {
                          "type": "boolean"
                        },
                        "status_text_color": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "belt_status_en",
                        "belt_status_zh",
                        "details_status_en",
                        "details_status_zh",
                        "listing_status_en",
                        "listing_status_zh",
                        "show_gate",
                        "status_text_color"
                      ],
                      "additionalProperties": false
                    }
                  },
                  "required": [
                    "actual_timestamp",
                    "aircraft_type",
                    "airline",
                    "airline_details",
                    "airport",
                    "airport_details",
                    "check_in_row",
                    "current_gate",
                    "direction",
                    "display_belt",
                    "display_checkinrowctr",
                    "display_gate",
                    "display_timestamp",
                    "drop_off_door",
                    "estimated_timestamp",
                    "flight_number",
                    "firstbag_timestamp",
                    "flight_status",
                    "flight_type",
                    "last_updated_timestamp",
                    "lastbag_timestamp",
                    "master_flight_number",
                    "nature",
                    "nearest_carpark",
                    "offblock_timestamp",
                    "origin_dep_country",
                    "origin_dep_date",
                    "origin_dep_terminal",
                    "origin_dep_time",
                    "origin_via_country",
                    "pick_up_door",
                    "previous_gate",
                    "scheduled_date",
                    "scheduled_time",
                    "slave_flights",
                    "technical_flight_status1",
                    "technical_flight_status2",
                    "terminal",
                    "via",
                    "via_airport_details",
                    "status_mapping"
                  ],
                  "additionalProperties": false
                }
              }
            },
            "required": [
              "next_token",
              "flights"
            ],
            "additionalProperties": false
          }
        },
        "required": [
          "getFlights"
        ],
        "additionalProperties": false
      }
    }
  }
} as const

export default contract
