# frozen_string_literal: true

json.array! @components, partial: "components/component", as: :component
json.array! @apps, partial: "apps/app", as: :app
json.array! @pages, partial: "pages/page", as: :page
json.array! @forms, partial: "forms/form", as: :form
