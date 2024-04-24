<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Ajay
 */
get_header();
?>

<main id="main" class="site-main content content-wrap" role="main">

    <?php if (have_posts()) : ?>

        <div class="archive-header archive-description">
            <?php
            the_archive_title('<h1 class="archive-title">', '</h1>');
            the_archive_description('<p class="taxonomy-description">', '</p>');
            ?>
        </div><!-- .page-header -->

        <?php
        /* Start the Loop */
        while (have_posts()) : the_post();

            /*
             * Include the Post-Format-specific template for the content.
             * If you want to override this in a child theme, then include a file
             * called content-___.php (where ___ is the Post Format name) and that will be used instead.
             */
            get_template_part('template-parts/content', get_post_format());

        endwhile;

        the_posts_navigation();

    else :

        get_template_part('template-parts/content', 'none');

    endif;
    ?>

</main><!-- #main -->

<?php
get_sidebar();
get_footer();
