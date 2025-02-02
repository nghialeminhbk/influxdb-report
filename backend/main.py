from flask import Flask, request, jsonify, json
import influxdb_client
from get_secret import get_secret
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

buckets, org, token, url = get_secret()
print(buckets, org, token, url)


@app.route('/api/reports', methods=['GET'])
def get_report():
    if (request.method == 'GET'):
        time = request.args['time']
        client = influxdb_client.InfluxDBClient(
            url=url,
            token=token,
            org=org
        )
        results = []
        query_api = client.query_api()
        print(buckets)
        for bucket in buckets:
            query = f'from(bucket: "{bucket}")\
            |> range(start: {time})\
            |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)\
            |> yield(name: "max")'

            result = query_api.query(org=org, query=query)

            tmp = []
            for table in result:
                for record in table.records:
                    item = {
                        "measurement": record.get_measurement(),
                        "field": record.get_field(),
                        "value": record.get_value(),
                        "start": record.get_start(),
                        "stop": record.get_stop(),
                        "status": "OK" if record.get_value() < 30 else "Not Ok"
                    }
                    tmp.append(item)
            results.append({
                "bucket": bucket,
                "data": tmp,
            })
            # response = json.dumps({
            #     "data" : results,
            #     "count" : len(results)
            # })
        return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True, port=5000, load_dotenv=True)
