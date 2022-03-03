# frozen_string_literal: true

class FormQuery < ActiveInteraction::Base
  object :data_source, class: DataSource
  object :form, class: Form
  hash :form_data, strip: false

  validates :form, :data_source, presence: true

  def execute
    form_query = form.form_query
    form_query = form_query.gsub("{{", "'{{").gsub("}}", "}}'")
    db_query = Mustache.render(form_query, form_data)
    compose(
      "#{data_source.source}_query".camelize.constantize,
      data_source: data_source,
      db_query: db_query
    )
  end
end
