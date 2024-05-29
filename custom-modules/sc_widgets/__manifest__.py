{
    "name":"sc_widgets",
    "version":"1.0",
    "depends":["base","web","crm"],
    "author":"Nick",
    "category":"View Extension",
    "description":"""
    Some description
""",
    "installable":True,
    "application":True,
    "data":[
        "views/views.xml"
    ],
    "assets":{
        'web.assets_backend': [
            'sc_widgets/static/src/**/*',
        ],
    }
}