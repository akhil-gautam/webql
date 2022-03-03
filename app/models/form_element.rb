# frozen_string_literal: true

class FormElement < ApplicationRecord
  belongs_to :form

  validates :field_order, uniqueness: { scope: :form_id }
  validates :label, :db_column, :field_type, :field_order, presence: true
end
