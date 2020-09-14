tags: notes, hyperdrive, p2p, blog, dat, decentralization

# Random ideas for Dat/Hyperdrive Markdown blog feed 

* If I have a **hyperdrive** and share my key with some friends, they can subscribe to my folder an consume the contained files as if it was a blog feed.
* That *hyperdrive* contains an `index.md` which is updated every time there is  a new file with a new post. This `index.md` file only contains a pointer, a reference, to the **hash** of the last published post and some info about the feed (ie: *profile info*). 
* Each post is contained in an independent file named with the sha256 hash of its Content `<hash>.md` (ie: `74483f06ddc9704d1547e4585af505a5102f409bd23aa208d05a6e3bac09ec60.md`) or the unix timestamp. 
* Each post file includes:
  * list of tags
  * content
  * timestamp
  * link to the previous post
* By knowing a **hyperdrive key**, you can load all the chain from last published post to the first one, by following the linked list structure. An UI can just load the next `N` posts when you scroll down.


<pre>
〰️◾◾◾◾◽◽◽◽◽◽〰️
〰️◽◽◽◾◾◾〰️◽◽◽◽
〰️◽◽◽◽◽◽〰️◾◾◾◾
〰️◽◽◽◽〰️◽◽◾◾◾◾
</pre>
