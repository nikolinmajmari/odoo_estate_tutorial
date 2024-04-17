import datetime

from odoo import api, models, fields


class EstateProperty(models.Model):
    _name = "estate_property"
    _description = "This table will hold properties info"

    active = fields.Boolean(default=True)
    state = fields.Selection(
        required=True,
        copy=False,
        default=None,
        selection=[
            ("new", "New"),
            ("offer_received", "Offer Received"),
            ("offer_accepted", "Offer Accepted"),
            ("sold", "Sold"),
            ("canceled", "Canceled")
        ]
    )

    name = fields.Char(required=True)
    description = fields.Text()
    postcode = fields.Char()
    date_availability = fields.Date(copy=False, default=fields.Date.add(fields.Date.today(), months=+1))
    expected_price = fields.Float(required=True)
    selling_price = fields.Float(readonly=True, copy=False)
    bedrooms = fields.Integer(default=2)
    living_area = fields.Integer()
    facades = fields.Integer()
    garage = fields.Boolean()
    garden = fields.Boolean()
    bathrooms = fields.Integer()
    garden_area = fields.Integer()
    garden_orientation = fields.Selection(
        string='Type of the orientation',
        selection=[('north', 'North'), ('east', "East"), ('south', "South"), ('west', 'West')]
    )
    total_area = fields.Integer(compute='_compute_total_area')

    best_offer = fields.Float(compute="_compute_best_offer")

    property_type_id = fields.Many2one("estate_property_type", string="Property Type", required=False)
    buyer_id = fields.Many2one("res.partner", copy=False, string="Property Buyer")
    sales_person_id = fields.Many2one("res.users", string="Sales Person", default=lambda self: self.env.user)

    tag_ids = fields.Many2many("estate_property_tag", string="Tags")
    offer_ids = fields.One2many("estate_property_offer", "property_id")

    @api.depends('garden_area', 'living_area')
    def _compute_total_area(self):
        for ep in self:
            ep.total_area = ep.living_area + ep.garden_area

    @api.depends("offer_ids.price")
    def _compute_best_offer(self):
        for ep in self:
            if len(ep.offer_ids.mapped("price")) != 0:
                ep.best_offer = max(ep.offer_ids.mapped("price"))
            else:
                ep.best_offer = 0

    @api.onchange("garden")
    def _on_change_garden(self):
        if self.garden:
            self.garden_orientation = "north"
            self.garden_area = 10
