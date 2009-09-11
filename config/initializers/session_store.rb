# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_Carbon.to_session',
  :secret      => '1b5a4b2367e3b70f0ad524231cb5ca23026f2c181dc2bae03815dff1d9bef010fbb655b2183e3b94b977466b72c2f2554ddf1ab43160dd43cc46603f597464e4'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
