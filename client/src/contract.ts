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
        "$schema": "https://json-schema.org/draft/2020-12/schema"
      }
    }
  }
} as const

export default contract
