# Dat

tags: recipes, technology, p2p, dat, decentralization, hypercore, hyperdrive


Note! This recipe has not beeen updated after the update from the dat protocol to the hyper protocol! Pending to be reviewed and updated ;)


## Is this a P2P site?

This website embodies its own philosophical claims by using a *peer-to-peer technical implementation*. It is not like a regular website hosted in a *centralized server* and *owned by a private company*. It is a literal backup of my brain, which goes directly from my laptop to your screen without any middle-man.

It has been built following the experimental technologies of the *peer-to-peer web*, an alternative to the _centralized paradigm_. Using *P2P* technologies for publishing is radically important in order to move towards a more horizontal, open and plural informational model without censorship or intermediaries.

With the clear intention of resisting the process of centralization of the Internet, by which vigilance, epistemological homogeneity, psychological manipulation, lack of data-ownership, and DNS-based censorship are becoming a growing threat, this site advocates for **peer-to-peer** (_P2P_) alternatives as emancipatory tools for any human being, but specially for writers and artists.

This archive of thoughts and rhizomatic notes can be *seeded* or *pinned* by anyone (basically, it can be *mirrored* in the dat network to guarantee it is accessible by other *peers* anytime).

As long as you know the `public key` identifier and the protocol you can keep a local synchronized copy. 


```
dat://b4699e912171c288d10e6a27e8f922791a24b7e4ecba5d12463e8708f2cc5989
```

To become an active node in this completely decentralized infrastructure you only need to know the `URL` displayed above and you are ready to go!


> This website a source which is basically impossible to censor. This archive is digitally signed and can be simultaneously stored in different servers, including laptops, *raspberry pi* devices and mobile phones. It is published through the **Dat Protocol** and can be accessed through the Internet, but also *off-the-grid*. As long as some other peer *seeds* this `dat` archive in a local `mesh network` (or in your `intranet`) it could be accessed completely *offline*, without the need of ISP providers.

> Do you want to know more about the technical aspects of `Dat`? Read more [here](https://docs.datproject.org/docs/intro).

**Let's say that you don't need access to the regular (or *legacy*) Internet**. You could read this site by connecting to other peer through a local *wifi* or *bluetooth*. If you are not that technical and just want to use the regular Internet, you can access the `https mirror` in http://xmunch.com/dat

But if you prefer to use the `Dat` network and access this site with pure *peer-to-peer* freedom, you can do it from your personal computer by keeping a local synchronized centre copy.

If you live in a boat without phone signal, if you are a *zen monk* living in the forest, if you have a transnational lifestyle and spend most of your life jumping between countries and planes... in any of those cases you can read this site from your computer by using the [Beaker Browser](https://beakerbrowser.com/) or any other `Dat` client.


Don't forget that in order to get the last content updates and pull the last version you would require to connect to a peer with the last version (or to the regular Internet) and sync your device. But with less than 5 minutes of connection you will be done :)

If you use Linux/OSX and are comfortable using the command line, take a look of the next section.

### CLI recipes

#### How to clone this site

The fastest option is to install `Dat` and clone the archive:

```bash
# Execute this command in install Dat from your shell
wget -qO- https://raw.githubusercontent.com/datproject/dat/master/download.sh | bash

# The following line will download the files of this site on your computer and create a new folder named like its public key
dat clone dat://b4699e912171c288d10e6a27e8f922791a24b7e4ecba5d12463e8708f2cc5989

# To check the last updates
cd b4699e912171c288d10e6a27e8f922791a24b7e4ecba5d12463e8708f2cc5989
dat pull
```

#### To keep a pin running in a server

If you want to guarantee that the site is available even though other nodes "pinning" it are *offline*:

* Open a terminal window and *SSH* your server
* Launch a `screen` (to keep the process running even after login out)
* Execute the same commands that we used to clone the site
* Execute `dat sync`
* Close the terminal window :)


----

> This archive only can be updated by the owner of the `private key`: by me :)
> Therefore, don't worry about censorship or manipulation of the original content.

As long as you keep the *public dat address* you will always get the last updates without any risk of fake data.

The peer-to-peer web is not only a libertarian dream of solar-punks, hackers, pirates, nonconformists or postmodern thinkers; it is also a crucial step in human development. Publishing my work in this format is a way to actively contribute to the cause, while highlighting the importance of building **free networks** for **free minds**.

> Drafting the paradigm we want for the next generation. Dreaming the world they will (hopefully) inhabit.

*Diego Gonzalez-Rodriguez* [http://www.xmunch.com]
