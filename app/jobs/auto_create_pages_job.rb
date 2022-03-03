class AutoCreatePagesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    AppFromTables.run!(
      data_source: args[0],
      user: args[1]
    )
  rescue => e
    # TODO: log error
    puts e.message
  end
end
