set :user, "root"
set :runner, "root"
set :application, "carbon.to"

default_run_options[:pty] = true
set :scm_passphrase, "converter" #This is your custom users password
set :repository,  "git@github.com:hinke/Carbon.to.git"
set :branch, "master"
set :scm, :git

set :deploy_to, "/var/www/vhosts/#{application}/rails/application"

server "carbon.to", :app, :web, :db, :primary => true

namespace :deploy do
  desc "Restart Application"
  task :restart do
  end

  [:start, :stop].each do |t|
    desc "#{t} task is a no-op with mod_rails"
    task t, :roles => :app do ; end
  end

  task :after_update_code do
    copy_config_files
  end

end

desc "Copy shared config files to new release"
task :copy_config_files, :roles => :app do
  %w(database.yml).each do |conf|
    run "cp #{shared_path}/system/config/#{conf} #{release_path}/config/#{conf}"
  end
end
