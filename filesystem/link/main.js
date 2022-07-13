/*
Underneath the file system, files are represented by inodes.

The i-node has info about the file and info about where the data is stored on disk.

A file in the file system is basically a link to an inode.
A hard link, then, just creates another file with a link to the same underlying inode.

When you delete a file, it removes one link to the underlying inode. The inode is only deleted (or deletable/over-writable) when all links to the inode have been deleted.

A symbolic link is a link to another name in the file system.

Once a hard link has been made the link is to the inode. Deleting, renaming, or moving the original file will not affect the hard link as it links to the underlying inode. 
Any changes to the data on the inode is reflected in all files that refer to that inode.

The useful feature that symbolic links can cross filesystems, as they are simply the name of another file. 
Hard links are only valid within the same File System (they must refer to a file on the same filesystem)
*/