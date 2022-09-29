<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Booking confirmation</h2>
<p>Hello {{ $confirmation['name'] }},</p>
<p>We confirm the reservation of a table at Italian restaurant !</p>
<p>Here is the summary of your reservation :</p>
<p>Name : {{ $confirmation['name'] }}</p>
<p>Date : {{ $confirmation['date'] }}</p>
<p>Hour : {{ $confirmation['time'] }}</p>
<p>Table number : {{ $confirmation['table_id'] }}</p>
<p>Number of people : {{ $confirmation['couverts'] }}</p>
<p>See you soon !</p>
</body>
</html>
