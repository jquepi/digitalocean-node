# Change Log

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning](http://semver.org/) and documents changes in a similar fashion to [Keep a CHANGELOG](http://keepachangelog.com/).

<a name="1.1.0"></a>
# 1.1.0 (2018-03-25)

* Add load balancers certificate ([@omgimanerd](https://github.com/omgimanerd))

<a name="1.0.0"></a>
# 1.0.0 (2018-01-28)

* Add firewalls ([@straley](https://github.com/straley))

<a name="0.12.0"></a>
# 0.12.0 (2017-11-26)

* Add auto-paging
* Only test on supported versions of node

<a name="0.11.0"></a>
# 0.11.0 (2017-10-05)

* Add load balancer resource. ([e2151bb](https://github.com/phillbaker/digitalocean-node/commit/e2151bb))


<a name="0.10.0"></a>
# 0.10.0 (2017-05-19)

* Bump version to 0.10.0 ([8a3b32d](https://github.com/phillbaker/digitalocean-node/commit/8a3b32d))
* Documentation fix ([4d8cc16](https://github.com/phillbaker/digitalocean-node/commit/4d8cc16))
* Documentation fix ([87848b2](https://github.com/phillbaker/digitalocean-node/commit/87848b2))
* Remove deprecated tag PUT endpoint. ([4fcd6e6](https://github.com/phillbaker/digitalocean-node/commit/4fcd6e6))



<a name="0.9.1"></a>
## 0.9.1 (2017-01-22)

* Add unified snapshot endpoints. ([62a27b3](https://github.com/phillbaker/digitalocean-node/commit/62a27b3)), closes [#9](https://github.com/phillbaker/digitalocean-node/issues/9)
* Add volume snapshot endpoints. ([e39fc65](https://github.com/phillbaker/digitalocean-node/commit/e39fc65))
* Added documentation for snapshots ([0f143ec](https://github.com/phillbaker/digitalocean-node/commit/0f143ec))
* Bump version to 0.9.0 ([6b79bc6](https://github.com/phillbaker/digitalocean-node/commit/6b79bc6))
* Bump version to 0.9.1 ([b34f83d](https://github.com/phillbaker/digitalocean-node/commit/b34f83d))
* Fix for #12 since volume detaching returns 202 ([f8689b4](https://github.com/phillbaker/digitalocean-node/commit/f8689b4)), closes [#12](https://github.com/phillbaker/digitalocean-node/issues/12)
* Fixed client.account.listSshKey typo ([e23e0c8](https://github.com/phillbaker/digitalocean-node/commit/e23e0c8))
* Standardized commas in documention of optional parameters ([8736505](https://github.com/phillbaker/digitalocean-node/commit/8736505))



<a name="0.8.3"></a>
## 0.8.3 (2016-09-06)

* Bump version to 0.8.3 ([a77dc7d](https://github.com/phillbaker/digitalocean-node/commit/a77dc7d))
* Fix volume create status code check. ([5cf78ef](https://github.com/phillbaker/digitalocean-node/commit/5cf78ef))


## [0.8.2] - 2016-08-05
### Fixed
- Incorrect route for domain record calls.

## [0.8.1] - 2016-08-03
### Fixed
- Extracting callback argument when there are no other arguments. (#5)


## [0.8.0] - 2016-08-01
### Added
- Client option for decamelizeKeys and de-camelcasing for query and body params for client-niceness.
