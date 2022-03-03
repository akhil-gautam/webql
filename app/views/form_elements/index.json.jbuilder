# frozen_string_literal: true

json.array! @form_elements, partial: "form_elements/form_element", as: :form_element
