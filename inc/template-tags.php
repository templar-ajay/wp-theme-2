<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Ajay
 */

if ( ! function_exists( 'ajay_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function ajay_posted_on() {
	$time_string = '<time class="entry-time" itemprop="datePublished" datetime="%1$s">%2$s</time>';

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() )
	);

	$posted_on = sprintf(
		esc_html_x( 'Posted on %s', 'post date', 'ajay' ),
		$time_string
	);

	$byline = sprintf(
		esc_html_x( 'by %s', 'post author', 'ajay' ),
		'<span class="entry-author" itemprop="author" itemscope="" itemtype="http://schema.org/Person"><a class="entry-author-link" itemprop="url" rel="author" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '"><span class="entry-author-name" itemprop="name">' . esc_html( get_the_author() ) . '</span></a></span>'
	);

	echo $posted_on; // WPCS: XSS OK.

}
endif;

if ( ! function_exists( 'ajay_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function ajay_entry_footer() {
    
        echo '<p class="entry-meta">';
	// Hide category and tag text for pages.
	if ( 'post' === get_post_type() ) {
		/* translators: used between list items, there is a space after the comma */
		$categories_list = get_the_category_list( esc_html__( ', ', 'ajay' ) );
		if ( $categories_list && ajay_categorized_blog() ) {
			printf( '<span class="entry-categories">' . esc_html__( 'Posted in %1$s', 'ajay' ) . '</span>', $categories_list ); // WPCS: XSS OK.
		}

		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', esc_html__( ', ', 'ajay' ) );
		if ( $tags_list ) {
			printf( '<span class="entry-tags">' . esc_html__( 'Tagged %1$s', 'ajay' ) . '</span>', $tags_list ); // WPCS: XSS OK.
		}
	}

	if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo '<span class="comments-link">';
		comments_popup_link( esc_html__( 'Leave a comment', 'ajay' ), esc_html__( '1 Comment', 'ajay' ), esc_html__( '% Comments', 'ajay' ) );
		echo '</span>';
	}

	edit_post_link(
		sprintf(
			/* translators: %s: Name of current post */
			esc_html__( 'Edit %s', 'ajay' ),
			the_title( '<span class="screen-reader-text">"', '"</span>', false )
		),
		'<span class="edit-link">',
		'</span>'
	);
        echo '</p>';
}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function ajay_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'ajay_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,
			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'ajay_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so ajay_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so ajay_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in ajay_categorized_blog.
 */
function ajay_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'ajay_categories' );
}
add_action( 'edit_category', 'ajay_category_transient_flusher' );
add_action( 'save_post',     'ajay_category_transient_flusher' );
