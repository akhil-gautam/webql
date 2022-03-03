FROM ruby:3.0.2

ENV APP_PATH /var/app
ENV BUNDLE_VERSION 2.3.5
ENV RAILS_PORT 3000
ENV BUNDLE_PATH /usr/local/bundle
ENV GEM_PATH /usr/local/bundle
ENV GEM_HOME /usr/local/bundle

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN gem install bundler --version "$BUNDLE_VERSION"

WORKDIR $APP_PATH

COPY Gemfile Gemfile.lock ./
RUN bundle check || bundle install

COPY . .

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0", "-p", $RAILS_PORT]