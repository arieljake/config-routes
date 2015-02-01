##Example

1) Define steps for route in json format:

	[
		{
			"fn": "database/mongo/getRecords",
			"config":
			{
				"collection": "tblCustomers",
				"saveTo": "customerRecords"
			}
		},
		{
			"fn": "output/res.send.final",
			"config":
			{
				"valueAt": "customerRecords"
			}
		}
	]
	
Reads as:
	
Step 1, get (all) records for the tblCustomers collection and save the results to 'customerRecords' in the common state
	
Step 2, call res.send() with the data stored at 'customerRecords' in common state