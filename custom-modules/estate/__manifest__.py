{
    'name': "estate",
    'version': '1.0',
    'depends': ['base'],
    'author': "Nick",
    'category': 'Category',
    'description': """
    Description text
    """,
    'installable': True,
    'application': True,
    "data": [
        "data/ir.model.access.csv",
        "views/estate_property_tag_views.xml",
        "views/estate_property_offer_views.xml",
        "views/estate_property_type_views.xml",
        "views/estate_property_views.xml",
        "views/estate_users_views.xml",
        "views/estate_menus.xml",
    ]
}
