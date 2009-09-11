set :user, "root"
set :runner, "root"
set :application, "carbon.to"

default_run_options[:pty] = true
set :scm_passphrase, "converter" #This is your custom users password
set :repository,  "git@github.com:hinke/Carbon.to.git"
set :branch, "master"
set :scm, :git

set :deploy_to, "/var/www/vhosts/#{application}/rails/application"
set :mongrel_conf, "#{release_path}/config/mongrel_cluster.yml"

server "carbon.to", :app, :web, :db, :primary => true

namespace :deploy do
  desc "Restart Application"
  task :restart do
    run "/etc/init.d/mongrel_cluster restart"
  end
    
  task :after_update_code do
    copy_config_files
  end

end

desc "Copy shared config files to new release"
task :copy_config_files, :roles => :app do
  %w(database.yml environment.rb mongrel_cluster.yml).each do |conf|
    run "cp #{shared_path}/system/config/#{conf} #{release_path}/config/#{conf}"
  end
end
