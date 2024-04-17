from odoo import api, models, fields


class EstatePropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Property offers"

    price = fields.Float()
    status = fields.Selection(
        string="Status of offer",
        selection=[
            ('accepted', 'Accepted'),
            ('refused', 'Refused')
        ],
        copy=False
    )
    validity = fields.Integer(default=7)
    date_deadline = fields.Date(compute='_compute_deadline', inverse='_inverse_deadline')

    partner_id = fields.Many2one("res.partner", required=True)
    property_id = fields.Many2one("estate_property", required=True)

    @api.depends("create_date", "validity")
    def _compute_deadline(self):
        for offer in self:
            if offer.create_date:
                offer.date_deadline = fields.Date.add(offer.create_date, days=+offer.validity)
            else:
                offer.date_deadline = fields.Date.add(fields.Date.today(), days=+offer.validity)

    def _inverse_deadline(self):
        for offer in self:
            if offer.date_deadline:
                offer.validity = (offer.date_deadline - offer.create_date.date()).days
