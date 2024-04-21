from odoo import api, models, fields
from odoo.exceptions import UserError
import logging

class EstatePropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Property offers"
    _order = "price desc"
    _sql_constraints = [
        ('check_property_offer_price', 'CHECK(price>=0)', 'Offer price must be >= 0')
    ]

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
    date_deadline = fields.Date(compute='_compute_deadline', inverse='_inverse_deadline', store=False)

    partner_id = fields.Many2one("res.partner", required=True)
    property_id = fields.Many2one("estate_property", required=True)
    property_type_id = fields.Many2one(related='property_id.property_type_id', store=True)

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

    def confirm_offer(self):
        for offer in self:
            if not offer.status:
                offer.status = "accepted"
                offer.property_id.buyer_id = self.partner_id
                offer.property_id.selling_price = self.price
                offer.property_id.state = 'offer_accepted'
                return True
            raise UserError(f'You can not confirm an {offer.status} offer')

    def refuse_offer(self):
        for offer in self:
            if not offer.status:
                offer.status = "refused"
                return True
            raise UserError(f'You can not refuse an {offer.status} offer')

    @api.model
    def create(self, vals_list):
        model = self.env['estate_property'].browse(vals_list['property_id'])
        if model.best_offer > vals_list['price']:
            raise UserError('Can\'t create an offer lower than '+str(model.best_offer))
        created = super().create(vals_list)
        if model and model.state == 'new':
            model.state = 'offer_received'
        return created
