import influxdb_client

def main():
    bucket = "bird"
    org = "b3ed6986826d3300"
    token = "UVc845ymtmAfa7y7NATSHY_McySSnHA2QXhWytt7DOPMJH1MVkBWsCa4B8qPaXxKVvkIBLxiRHGUFQMY6Gt5Ww=="
    url="http://127.0.0.1:8086"

    client = influxdb_client.InfluxDBClient(
        url=url,
        token=token,
        org=org
    )

    time = "-7h"
    query_api = client.query_api()
    query = f'from(bucket: "{bucket}")\
    |> range(start: {time})\
    |> aggregateWindow(every: 3h, fn: mean, createEmpty: false)\
    |> yield(name: "mean")'

    result = query_api.query(org=org, query=query)

    results = []
    for table in result:
        for record in table.records:
            results.append([record.get_measurement(), record.get_field(), record.get_value(), record.get_start(), record.get_stop()])
    print(results)



if __name__=="__main__":
    main()